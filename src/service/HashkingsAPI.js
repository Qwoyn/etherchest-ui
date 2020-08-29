import axios from "axios";
import { format as formatTimeAgo } from "timeago.js";

export class HashkingsAPI {
  baseUrl = "https://api.hashkings.app/"; // main api
  
  get(suffix) {
    return axios.get(this.baseUrl + suffix).then(res => res.data);
  }

  getTrending() {
    return this.getSteemAPI("get_discussions_by_trending", [
      { tag: "cannabis", limit: 20 }
    ]);
  }

  getTrendingHome() {
    return this.getSteemAPI("get_discussions_by_trending", [
      { tag: "cannabis", limit: 1 }
    ]);
  }

  getUser(username) {
    return this.get(`u/${username}`);
  }

  getUserLand(username) {
    return this.get(`a/${username}`);
  }

  getUserSeeds(username) {
    return this.get(`s/${username}`);
  }

  getUserPollen(username) {
    return this.get(`pollen/${username}`);
  }

  getUserBuds(username) {
    return this.get(`buds/${username}`);
  }

  getUserDelegation(username) {
    return this.get(`delegation/${username}`);
  }

  getStats() {
    return this.get("stats");
  }

  getAll() {
    return this.get("");
  }

  getSteemAPI(method, params) {
    return axios
      .post(
        "https://api.steemit.com/",
        JSON.stringify({
          id: 0,
          jsonrpc: "2.0",
          method: `condenser_api.${method}`,
          params
        })
      )
      .then(res => res.data.result);
  }

  getDGPO() {
    return this.getSteemAPI("get_dynamic_global_properties", []);
  }

  async getAccountHistory(steemPerVest, username, fetchAll, startId = -1) {
    try {
      const history = await this.getSteemAPI("get_account_history", [
        username,
        startId,
        500
      ]).then(h => h.reverse());

      const accounts = ["hashkings", "hk-stream"];

      const payouts = history
        .filter(
          h =>
            h[1].op[0] === "comment_benefactor_reward" &&
            accounts.includes(h[1].op[1].author)
        )
        .map(payout => {
          const [
            ,
            {
              block,
              timestamp,
              op: [, { permlink, sbd_payout, steem_payout, vesting_payout }]
            }
          ] = payout;

          return {
            permlink,
            sbd_payout,
            steem_payout,
            sp_payout: `${(vesting_payout.split(" ")[0] * steemPerVest).toFixed(
              3
            )} SP`,
            timestamp,
            block
          };
        });

      const landPurchases = history
        .filter(
          h =>
            h[1].op[0] === "transfer" &&
            h[1].op[1].to === "hashkings" &&
            Object.keys(gardenNames).includes(h[1].op[1].memo.split(" ")[0]) &&
            h[1].op[1].memo.split(" ")[1] === "manage"
        )
        .map(purchase => {
          const [
            ,
            {
              block,
              timestamp,
              trx_id,
              op: [, { memo, amount }]
            }
          ] = purchase;

          return {
            region: gardenNames[memo.split(" ")[0]],
            amount,
            timestamp,
            block,
            trx_id
          };
        });

      const seedPurchases = history
        .filter(
          h =>
            h[1].op[0] === "transfer" &&
            h[1].op[1].to === "hashkings" &&
            Object.keys(seedTypes).includes(h[1].op[1].memo.split(" ")[0][0]) &&
            h[1].op[1].memo.split(" ")[0].slice(1) === "seed" &&
            Object.keys(seedNames).includes(h[1].op[1].memo.split(" ")[1])
        )
        .map(purchase => {
          const [
            ,
            {
              block,
              timestamp,
              trx_id,
              op: [, { memo, amount }]
            }
          ] = purchase;

          return {
            strain: seedNames[memo.split(" ")[1]],
            type: seedTypes[memo.split(" ")[0][0]].name,
            amount,
            timestamp,
            block,
            trx_id
          };
        });

      const lastTx = history[history.length - 1];
      const oldestBlock = lastTx[1].block;
      const oldestId = lastTx[0] - 1;

      if (
        payouts.length === 0 &&
        landPurchases.length === 0 &&
        seedPurchases.length === 0 &&
        oldestBlock >= 31804536
      ) {
        return this.getAccountHistory(
          steemPerVest,
          username,
          fetchAll,
          oldestId
        );
      } else {
        if (oldestBlock >= 31804536 && fetchAll) {
          const next = await this.getAccountHistory(
            steemPerVest,
            username,
            fetchAll,
            oldestId
          );
          return {
            ...next,
            payouts: [...payouts, ...next.payouts],
            landPurchases: [...landPurchases, ...next.landPurchases],
            seedPurchases: [...seedPurchases, ...next.seedPurchases]
          };
        } else {
          return {
            payouts,
            oldestId,
            stop: oldestBlock < 31804536, // block of first action,
            date: new Date(lastTx[1].timestamp).toDateString(),
            landPurchases,
            seedPurchases
          };
        }
      }
    } catch (e) {
      console.log(e);
      return {
        payouts: [],
        oldestId: startId,
        stop: false,
        landPurchases: [],
        seedPurchases: []
      };
    }
  }

  async getDashboardStats(username = undefined) {
    let requests = [this.getStats(), this.getAll(), this.getDGPO()];

    if (username) {
      const userRequests = [this.getUser(username), this.getUserLand(username)];
      requests = [...requests, ...userRequests];
    }

    const [stats, all, dgpo, user, userLand] = await Promise.all(requests);

    const { ac, bc, cc, dc, ec, fc } = stats.supply.land;

    const gardens = ac + bc + cc + dc + ec + fc;

    const headBlockNum = dgpo.head_block_number;

    const totalDelegation = all.delegations
      .map(delegation => delegation.vests)
      .reduce((prev, current) => prev + current);

    const delegationVestsToSteem = (
      (parseFloat(dgpo.total_vesting_fund_steem.split(" ")[0]) *
        totalDelegation) /
      parseFloat(dgpo.total_vesting_shares.split(" ")[0]) /
      1000000 + 1217.81  
    ).toFixed(3);

    const leaderboard = Object.keys(all.users)
      .map(username => {
        const user = all.users[username];
        const seedsXp = user.seeds
          .map(seed => seed.xp)
          .reduce((a, b) => a + b, 0);

        const plantedXp = user.addrs
          .map(addr => {
            const plot = all.land[addr];
            return plot ? plot.xp : 0;
          })
          .reduce((a, b) => a + b, 0);
        return {
          username: username,
          xp: seedsXp + plantedXp
        };
      })
      .sort((a, b) => b.xp - a.xp)
      .slice(0, 10)
      .map((l, position) => ({ ...l, position: position + 1 }));

    if (username) {
      const activeGardens = userLand.filter(land => typeof land === "object");
      const availableGardens = userLand.filter(
        land => typeof land === "string"
      );
      const availableSeeds = user.seeds || [];
      const availablePollen = user.pollen || [];
      const availableBuds = user.buds || [];
      const availableJoints = user.joints || [];
      const availableEdibles = user.edibles || [];
      const availableBlunts = user.blunts || [];
      const availableDippedJoints = user.dippedjoints || [];
      const availableCannagars = user.cannagars || [];
      const availablePapers = user.papers || [];
      const availableBluntwraps = user.bluntwraps || [];
      const availableHempwraps = user.hempwraps || [];
      const availableKiefbox = user.kiefbox || [];
      const availableVacovens = user.vacoven || [];
      const availableBrownieMix = user.browniemix || [];
      const availableKief = user.kief || [];
      const availableOil = user.oil || [];
      const totalxps = user.xps || [];
      const breederName = user.breeder || [];

      const watered = activeGardens
        .map(garden =>
          garden.care
            .filter(care => care[1] === "watered")
            .map(watered => {
              const date = new Date(Date.now());
              date.setSeconds(
                date.getSeconds() - (headBlockNum - watered[0]) * 3
              );
              return {
                when: formatTimeAgo(date),
                id: garden.id,
                block: watered[0],
                strain: garden.seed.strain,
                type: "watered"
              };
            })
        )
        .flat();

        const harvested = activeGardens
        .map(garden =>
          garden.care
            .filter(care => care[1] === "harvested")
            .map(harvested => {
              const date = new Date(Date.now());
              date.setSeconds(
                date.getSeconds() - (headBlockNum - harvested[0]) * 3
              );
              return {
                when: formatTimeAgo(date),
                id: garden.id,
                block: harvested[0],
                strain: garden.seed.strain,
                type: "harvested"
              };
            })
        )
        .flat();

        const pollinated = activeGardens
        .map(garden =>
          garden.care
            .filter(care => care[1] === "pollinated")
            .map(pollinated => {
              const date = new Date(Date.now());
              date.setSeconds(
                date.getSeconds() - (headBlockNum - pollinated[0]) * 3
              );
              return {
                when: formatTimeAgo(date),
                id: garden.id,
                block: pollinated[0],
                strain: garden.pollen.strain,
                type: "pollinated"
              };
            })
        )
        .flat();

      const planted = activeGardens.map(garden => {
        const date = new Date(Date.now());
        date.setSeconds(
          date.getSeconds() - (headBlockNum - garden.planted) * 3
        );
        return {
          id: garden.id,
          strain: garden.strain,
          when: formatTimeAgo(date),
          block: garden.planted,
          type: "planted"
        };
      });

      const activity = [...planted, ...watered, ...harvested, ...pollinated].sort(
        (a, b) => b.block - a.block
      );

      return {
        gardeners: stats.gardeners,
        gardens,
        availableSeeds: availableSeeds.length,
        availablePollen: availablePollen.length,
        availableBuds: availableBuds.length,
        availableJoints: availableJoints.length,
        availableEdibles: availableEdibles.length,
        availableBlunts: availableBlunts.length,
        availableDippedJoints: availableDippedJoints.length,
        availableCannagars: availableCannagars.length,
        availablePapers: availablePapers,
        availableVacovens: availableVacovens,
        availableBluntwraps: availableBluntwraps,
        availableHempwraps: availableHempwraps,
        availableKiefbox: availableKiefbox,
        availableBrownieMix: availableBrownieMix,
        availableKief: availableKief.length,
        availableOil: availableOil.length,
        totalxps: totalxps,
        activeGardens: activeGardens.length,
        availableGardens: availableGardens.length,
        activity,
        breederName: breederName,
        delegation: delegationVestsToSteem,
        leaderboard
      };
    } else {
      return {
        gardeners: stats.gardeners,
        gardens,
        delegation: delegationVestsToSteem,
        leaderboard
      };
    }
  }

  async getUserGarden(username) {
    const [user, userLand, dgpo] = await Promise.all([
      this.getUser(username),
      this.getUserLand(username),
      this.getDGPO()
    ]);
    const activeGardens = userLand.filter(
      land => typeof land === "object" && land.stage >= 0
    );
    const availableGardens = userLand.filter(land => typeof land === "string");
    const harvestedLand = userLand
      .filter(land => typeof land === "object" && land.stage < 0)
      .map(land => land.id);
    availableGardens.push(...harvestedLand);
    const availableSeeds = user.seeds || [];
    const availablePollen = user.pollen || [];
    const availableBuds = user.buds || [];
    const availableKief = user.kief || [];
    const availableOil = user.oil || [];
    const totalxps = user.xps || [];
    const availableJoints = user.joints || [];
    const availableEdibles = user.edibles || [];
    const availableBlunts = user.blunts || [];
    const availableDippedJoints = user.dippedjoints || [];
    const availableCannagars = user.cannagars || [];
    const availablePapers = user.papers || [];
    const availableBluntwraps = user.bluntwraps || [];
    const availableHempwraps = user.hempwraps || [];
    const availableKiefbox = user.kiefbox || [];
    const availableVacovens= user.vacoven || [];
    const availableBrownieMix = user.browniemix || [];
    const breederName = user.breeder || [];

    return {
      activeGardens,
      availableGardens,
      availableSeeds,
      availablePollen,
      availableBuds,
      availableJoints,
      availableVacovens,
      availableEdibles,
      availableDippedJoints,
      availableCannagars,
      availableBluntwraps,
      availableBlunts,
      availablePapers,
      availableHempwraps,
      availableKiefbox,
      availableBrownieMix,
      availableKief,
      availableOil,
      totalxps,
      breederName,
      headBlockNum: dgpo.head_block_number
    };
  }

  userExists(username) {
    return this.getAll().then(all => Object.keys(all.users).includes(username));
  }

  steemUserExists(username) {
    return this.getSteemAPI("get_accounts", [[username]]).then(
      user => user && user[0] && user[0].name
    );
  }
}

export const gardenNames = {
  a: "Afghanistan",
  b: "Africa", 
  c: "Asia",
  d: "Central America",
  e: "Jamaica",
  f: "Mexico"
};

export const profileImages = {
  1: "Afghanistan",
  2: "Africa", 
  3: "Asia",
  4: "Central America",
  5: "Jamaica",
  6: "Mexico"
};

export const seedNames = {
  hk: "Hindu Kush",
  dp: "Durban Poison",
  lb: "Lambs Bread",
  afg: "Afghani",
  lkg: "Lashkar Gah",
  mis: "Mazar i Sharif",
  kbr: "Kings Bread",
  aca: "Acapulco Gold",
  swz: "Swazi Gold",
  kmj: "Kilimanjaro",
  mal: "Malawi",
  pam: "Panama Red",
  cg: "Colombian Gold",
  ach: "Aceh",
  tha: "Thai",
  cht: "Chocolate Thai",
  sog: "Steem OG"
};

export const pollenNames = {
  hk: "Hindu Kush",
  dp: "Durban Poison",
  lb: "Lambs Bread",
  afg: "Afghani",
  lkg: "Lashkar Gah",
  mis: "Mazar i Sharif",
  kbr: "Kings Bread",
  aca: "Acapulco Gold",
  swz: "Swazi Gold",
  kmj: "Kilimanjaro",
  mal: "Malawi",
  pam: "Panama Red",
  cg: "Colombian Gold",
  ach: "Aceh",
  tha: "Thai",
  cht: "Chocolate Thai",
  sog: "Steem OG"
};

export const seedTypes = {
  r: {
    num: 5000,
    str: "5.0-0",
    name: "Basic"
  },
  m: {
    num: 5000,
    str: "5.000",
    name: "Premium"
  },
  t: {
    num: 5000,
    str: "5.000",
    name: "Hand-Picked"
  },
  s: {
    num: 10000,
    str: "10.000",
    name: "Steem OG"
  }
};

export const gardenLinkNames = {
  a: "Afghanistan",
  b: "Africa", 
  c: "Asia",
  d: "Central-America",
  e: "Jamaica",
  f: "Mexico"
};

export const seedLinkNames = {
  hk: "Hindu-Kush",
  dp: "Durban-Poison",
  lb: "Lambs-Bread",
  afg: "Afghani",
  lkg: "Lashkar-Gah",
  mis: "Mazar-i-Sharif",
  kbr: "Kings-Bread",
  aca: "Acapulco-Gold",
  swz: "Swazi-Gold",
  kmj: "Kilimanjaro",
  mal: "Malawi",
  pam: "Panama-Red",
  cg: "Colombian-Gold",
  ach: "Aceh",
  tha: "Thai",
  cht: "Chocolate-Thai",
  sog: "Steem-OG"
};