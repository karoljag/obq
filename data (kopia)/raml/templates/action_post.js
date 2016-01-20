var tags = tmplUtils.multiCollection(1, 20)(function (i) {
  return faker.name.lastName();
});

tags = tags.filter(function(item, pos) {
    return tags.indexOf(item) == pos;
});

module.exports = {
  name: faker.name.lastName(),
  tags: tags,
  arguments: faker.random.array_element([
    ['$CounterIncremented.counterName==LB_mainScoreMonth_WINS'],
    ['$ScoreInSnapshotChanged'],
    [
      'pointsEarn',
      'pointsAmount',
      'fromPartner==true',
      'source==SGDB',
      'mid'
    ]
  ]),
  code: "var partnerData = {\n    name: \"HiltonHhonors\",\n    mid: [ \"702840200017001\" ],\n    prefix: \"PARTNER_POINTS\",\n    badgeLevels: [ {\n        value: 1,\n        levelName: \"RED\"\n    }, {\n        value: 5,\n        levelName: \"BRONZE\"\n    }, {\n        value: 10,\n        levelName: \"SILVER\"\n    }, {\n        value: 20,\n        levelName: \"GOLD\"\n    } ]\n}, checkPartner = function(e) {\n    return partnerData.mid.indexOf(e.mid) >= 0;\n};\n\nif (checkPartner($event)) {\n    var userId = $self.id(), tags = [ \"partnerAction\" ];\n    $system.sendUserEvent(userId, tags, {\n        handlePartnerEvent: !0,\n        partnerPrefix: partnerData.prefix,\n        pointsAmount: $event.pointsAmount,\n        partnerName: partnerData.name,\n        partnerLevels: partnerData.badgeLevels\n    });\n}"
  //code: "if (\"mainScoreWeek\" === $event.leaderboardId || 0 === $event.leaderboardId.indexOf(\"lb_\")) {var date = new Date().toISOString();$self.notifications().push({type: \"notificationLeaderboardUpdate\",ranking: $event.ranking,createdAt: date,isRead: !1});}"
}