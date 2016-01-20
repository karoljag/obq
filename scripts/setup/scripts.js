module.exports = [

  // OTHER ---------------------------------------------------------------------------------------------------

  {
    code: setupUtils.getCode('../scripts/other_join.js'),
    id: 'other_join',
    tags: [
      'qbo'
    ],
    arguments: [
      '$Created' 
    ]
  },
  {
    code: setupUtils.getCode('../scripts/other_tutorial.js'),
    id: 'other_tutorial',
    tags: [
      'qbo'
    ],
    arguments: [
      'name==tutorialPassed'
    ]
  },
  {
    code: setupUtils.getCode('../scripts/other_connectMachine.js'),
    id: 'other_connectMachine',
    tags: [
      'qbo'
    ],
    arguments: [
      'name==setupAsAdmin'
    ]
  },
  {
    code: setupUtils.getCode('../scripts/other_connectMilk.js'),
    id: 'other_connectMilk',
    tags: [
      'qbo'
    ],
    arguments: [
      'name==milkElementAttached'
    ]
  },
  {
    code: setupUtils.getCode('../scripts/other_subscribe.js'),
    id: 'other_subscribe',
    tags: [
      'qbo'
    ],
    arguments: [
      'name==subscribeNL'
    ]
  },
  {
    code: setupUtils.getCode('../scripts/other_usage.js'),
    id: 'other_usage',
    tags: [
      'qbo'
    ],
    arguments: [
      '$CounterIncremented.counterName==usage'
    ]
  },
  {
    code: setupUtils.getCode('../scripts/other_usage_counterInc.js'),
    id: 'other_usage_counterInc',
    tags: [
      'qbo'
    ],
    arguments: [
      'name==loggedIn'
    ]
  },
  {
    code: setupUtils.getCode('../scripts/other_pollParticipate.js'),
    id: 'other_pollParticipate',
    tags: [
      'qbo'
    ],
    arguments: [
      'name==pollParticipate'
    ]
  },
  {
    code: setupUtils.getCode('../scripts/other_surveyParticipate.js'),
    id: 'other_surveyParticipate',
    tags: [
      'qbo'
    ],
    arguments: [
      'name==surveyParticipate'
    ]
  },
  
// MAIN -----------------------------------------------------------------------------------------------------  
  {
    code: setupUtils.getCode('../scripts/main_clean.js'),
    id: 'main_clean',
    tags: [
      'qbo'
    ],
    arguments: [
      'name==clean'
    ]
  },
  {
    code: setupUtils.getCode('../scripts/main_descale.js'),
    id: 'main_descale',
    tags: [
      'qbo'
    ],
    arguments: [
      'name==descale'
    ]
  },
  {
    code: setupUtils.getCode('../scripts/main_longRinse.js'),
    id: 'main_longRinse',
    tags: [
      'qbo'
    ],
    arguments: [
      '$CounterIncremented.counterName==longRinse'
    ]
  },
  {
    code: setupUtils.getCode('../scripts/main_longRinse_counterInc.js'),
    id: 'main_longRinse_counterInc',
    tags: [
      'qbo'
    ],
    arguments: [
      'name==longRinse'
    ]
  },

// FREQUENCY ------------------------------------------------------------------------------------------------

  {
    code: setupUtils.getCode('../scripts/freq_brewCoffee.js'),
    id: 'freq_brewCoffee',
    tags: [
      'qbo'
    ],
    arguments: [
      '$CounterIncremented.counterName==brewCoffee'
    ]
  },
  {
    code: setupUtils.getCode('../scripts/freq_brewCoffee_counterInc.js'),
    id: 'freq_brewCoffee_counterInc',
    tags: [
      'qbo'
    ],
    arguments: [
      'name==brew'
    ]
  },
  {
    code: setupUtils.getCode('../scripts/freq_coffeeTypes.js'),
    id: 'freq_coffeeTypes',
    tags: [
      'qbo'
    ],
    arguments: [
      '$CounterIncremented.counterName==coffeeTypes', '$CounterIncremented.counterValue>=10'
    ]
  },
  {
    code: setupUtils.getCode('../scripts/freq_coffeeType_counterInc.js'),
    id: 'freq_coffeeType_counterInc',
    tags: [
      'qbo'
    ],
    arguments: [
      "name==brew", "capsuleId"
    ]
  },
  {
    code: setupUtils.getCode('../scripts/freq_milkConsume.js'),
    id: 'freq_milkConsume',
    tags: [
      'qbo'
    ],
    arguments: [
      '$CounterIncremented.counterName==milkConsume'
    ]
  },

  {
    code: setupUtils.getCode('../scripts/freq_type_altaMogiana.js'),
    id: 'freq_type_altaMogiana',
    tags: [
      'qbo'
    ],
    arguments: [
      '$CounterIncremented.counterName==coffeeType_altaMogiana'
    ]
  },
  {
    code: setupUtils.getCode('../scripts/freq_type_babaBudan.js'),
    id: 'freq_type_babaBudan',
    tags: [
      'qbo'
    ],
    arguments: [
      '$CounterIncremented.counterName==coffeeType_babaBudan'
    ]
  },
  {
    code: setupUtils.getCode('../scripts/freq_type_buenaEnteta.js'),
    id: 'freq_type_buenaEnteta',
    tags: [
      'qbo'
    ],
    arguments: [
      '$CounterIncremented.counterName==coffeeType_buenaEnteta'
    ]
  },
  {
    code: setupUtils.getCode('../scripts/freq_type_cafezinhoIpanema.js'),
    id: 'freq_type_cafezinhoIpanema',
    tags: [
      'qbo'
    ],
    arguments: [
      '$CounterIncremented.counterName==coffeeType_cafezinhoIpanema'
    ]
  },
  {
    code: setupUtils.getCode('../scripts/freq_type_estradaParaiso.js'),
    id: 'freq_type_estradaParaiso',
    tags: [
      'qbo'
    ],
    arguments: [
      '$CounterIncremented.counterName==coffeeType_estradaParaiso'
    ]
  },
  {
    code: setupUtils.getCode('../scripts/freq_type_indianNiligri.js'),
    id: 'freq_type_indianNiligri',
    tags: [
      'qbo'
    ],
    arguments: [
      '$CounterIncremented.counterName==coffeeType_indianNiligri'
    ]
  },
  {
    code: setupUtils.getCode('../scripts/freq_type_jebenaYirga.js'),
    id: 'freq_type_jebenaYirga',
    tags: [
      'qbo'
    ],
    arguments: [
      '$CounterIncremented.counterName==coffeeType_jebenaYirga'
    ]
  },
  {
    code: setupUtils.getCode('../scripts/freq_type_oroNarino.js'),
    id: 'freq_type_oroNarino',
    tags: [
      'qbo'
    ],
    arguments: [
      '$CounterIncremented.counterName==coffeeType_oroNarino'
    ]
  },
  {
    code: setupUtils.getCode('../scripts/freq_type_sidamaRoyal.js'),
    id: 'freq_type_sidamaRoyal',
    tags: [
      'qbo'
    ],
    arguments: [
      '$CounterIncremented.counterName==coffeeType_sidamaRoyal'
    ]
  },
  {
    code: setupUtils.getCode('../scripts/freq_type_volcanesAntigua.js'),
    id: 'freq_type_volcanesAntigua',
    tags: [
      'qbo'
    ],
    arguments: [
      '$CounterIncremented.counterName==coffeeType_volcanesAntigua'
    ]
  },
  {
    code: setupUtils.getCode('../scripts/freq_buyProduct_counterInc.js'),
    id: 'freq_buyProduct_counterInc',
    tags: [
      'qbo'
    ],
    arguments: [
      "name==buy", "product"
    ]
  },
  {
    code: setupUtils.getCode('../scripts/freq_buy_accessory.js'),
    id: 'freq_buy_accessory',
    tags: [
      'qbo'
    ],
    arguments: [
      "$CounterIncremented.counterName==buyProduct_accessory"
    ]
  },
  {
    code: setupUtils.getCode('../scripts/freq_buy_cleaningCapsule.js'),
    id: 'freq_buy_cleaningCapsule',
    tags: [
      'qbo'
    ],
    arguments: [
      "$CounterIncremented.counterName==buyProduct_cleaningCapsule"
    ]
  },
  {
    code: setupUtils.getCode('../scripts/freq_buy_coffeeCapsule.js'),
    id: 'freq_buy_coffeeCapsule',
    tags: [
      'qbo'
    ],
    arguments: [
      "$CounterIncremented.counterName==buyProduct_coffeeCapsule"
    ]
  },
  {
    code: setupUtils.getCode('../scripts/freq_buy_descalingCapsule.js'),
    id: 'freq_buy_descalingCapsule',
    tags: [
      'qbo'
    ],
    arguments: [
      "$CounterIncremented.counterName==buyProduct_descalingCapsule"
    ]
  },
  {
    code: setupUtils.getCode('../scripts/freq_pretest.js'),
    id: 'freq_pretest',
    tags: [
      'qbo'
    ],
    arguments: [
      "$CounterIncremented.counterName==brewPretest"
    ]
  },

// SOCIAL ---------------------------------------------------------------------------------------------------

  {
    code: setupUtils.getCode('../scripts/social_createRecipe_counterInc.js'),
    id: 'social_createRecipe_counterInc',
    tags: [
      'qbo'
    ],
    arguments: [
      "name==createRecipe"
    ]
  },
  {
    code: setupUtils.getCode('../scripts/social_createRecipe.js'),
    id: 'social_createRecipe',
    tags: [
      'qbo'
    ],
    arguments: [
      "$CounterIncremented.counterName==createRecipe"
    ]
  },
  {
    code: setupUtils.getCode('../scripts/social_shareRecipe_counterInc.js'),
    id: 'social_shareRecipe_counterInc',
    tags: [
      'qbo'
    ],
    arguments: [
      "name==shareRecipe"
    ]
  },
  {
    code: setupUtils.getCode('../scripts/social_shareRecipe.js'),
    id: 'social_shareRecipe',
    tags: [
      'qbo'
    ],
    arguments: [
      "$CounterIncremented.counterName==shareRecipe"
    ]
  },
  {
    code: setupUtils.getCode('../scripts/social_tellFriend_counterInc.js'),
    id: 'social_tellFriend_counterInc',
    tags: [
      'qbo'
    ],
    arguments: [
      "name==tellFriend"
    ]
  },
  {
    code: setupUtils.getCode('../scripts/social_tellFriend.js'),
    id: 'social_tellFriend',
    tags: [
      'qbo'
    ],
    arguments: [
      "$CounterIncremented.counterName==tellFriend"
    ]
  },
  {
    code: setupUtils.getCode('../scripts/social_favRecipe_counterInc.js'),
    id: 'social_favRecipe_counterInc',
    tags: [
      'qbo'
    ],
    arguments: [
      "name==addFavouriteRecipe"
    ]
  },
  {
    code: setupUtils.getCode('../scripts/social_favRecipe.js'),
    id: 'social_favRecipe',
    tags: [
      'qbo'
    ],
    arguments: [
      "$CounterIncremented.counterName==favRecipe"
    ]
  },

// SYSTEM ---------------------------------------------------------------------------------------------------

  {
    code: setupUtils.getCode('../scripts/system_badgesWithProgress.js'),
    id: 'system_badgesWithProgress',
    tags: [
      'badgesWithProgress'
    ],
    arguments: [
      'handleBadgesWithProgress', 'badgeName', 'badgeLevels'
    ]
  },
  {
    code: setupUtils.getCode('../scripts/system_level.js'),
    id: 'system_level',
    tags: [
      'qbo'
    ],
    arguments: [
      "$AchievementAdded"
    ]
  },
  {
    code: setupUtils.getCode('../scripts/system_notifEarnBadge.js'),
    id: 'system_notifEarnBadge',
    tags: [
      'qbo'
    ],
    arguments: [
      "$AchievementAdded"
    ]
  },
  {
    code: setupUtils.getCode('../scripts/importer_voucherUpload.js'),
    id: 'importer_voucherUpload',
    tags: [
      'qbo',
      'voucherImport'
    ],
    arguments: [
      "fileName", "voucherId", "path"
    ]
  },
  {
    code: setupUtils.getCode('../scripts/importer_voucherImport.js'),
    id: 'importer_voucherImport',
    tags: [
      'qbo',
      'voucherImport'
    ],
    arguments: [
      "filePath", "fileName"
    ]
  },
  {
    code: setupUtils.getCode('../scripts/system_voucherNotification.js'),
    id: 'system_voucherNotification',
    tags: [
      'qbo'
    ],
    arguments: [
      "$CodeAssigned"
    ]
  },
  {
    code: setupUtils.getCode('../scripts/system_voucherRedeemedNotif.js'),
    id: 'system_voucherRedeemedNotif',
    tags: [
      'qbo'
    ],
    arguments: [
      "$CodeRedeemed"
    ]
  }
];