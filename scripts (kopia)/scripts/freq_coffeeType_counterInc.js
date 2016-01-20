/*
 * description: The script increments the coffeeTypes counter.
 * arguments: ["name==brew", "capsuleId"]
 */

var coffeeList = [
  {capsuleId: 'cof1', coffeeId: 'babaBudan'},
  {capsuleId: 'cof2', coffeeId: 'volcanesAntigua'},
  {capsuleId: 'cof3', coffeeId: 'jebenaYirga'},
  {capsuleId: 'cof4', coffeeId: 'estradaParaiso'},
  {capsuleId: 'cof5', coffeeId: 'buenaEnteta'},
  {capsuleId: 'cof6', coffeeId: 'altaMogiana'},
  {capsuleId: 'cof7', coffeeId: 'indianNiligri'},
  {capsuleId: 'cof8', coffeeId: 'sidamaRoyal'},
  {capsuleId: 'cof9', coffeeId: 'oroNarino'},
  {capsuleId: 'cof10', coffeeId: 'cafezinhoIpanema'}
];

var currentCoffee = _.find(coffeeList, {capsuleId: $event.capsuleId}),
  counterPrefix = 'coffeeType_',
  counterName = '';

if (currentCoffee) {

  counterName = counterPrefix + currentCoffee.coffeeId;

  // count unique types of coffee

  if($event.brewed && $event.brewed.coffeeAmount && $event.brewed.coffeeAmount > 20){
    if (!$self.counters().get(counterName)) {
      $self.counters().inc('coffeeTypes');
    }
    $self.counters().inc(counterName);
  }

} else {
  throw new Error('Unknown capsule id.');
}