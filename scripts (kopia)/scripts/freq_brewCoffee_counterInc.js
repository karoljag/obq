/*
 * description: The script increments the brewCoffee counter.
 * arguments: ["name==brew"]
 */
if($event.brewed && $event.brewed.coffeeAmount && $event.brewed.coffeeAmount > 20){
  $self.counters().inc('brewCoffee');
}


if ($event.brewed && $event.brewed.milkAmount && $event.brewed.foamAmount) {
  var milkAmount = $event.brewed.milkAmount + $event.brewed.foamAmount;
  $self.counters().inc('milkConsume', milkAmount );
}

if ($event.recipe && $event.recipe.pretest) {
  $self.counters().inc('brewPretest');
}

