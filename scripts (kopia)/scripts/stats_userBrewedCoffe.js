//
// increment stats about brew coffe
//
// arguments: ['name==brew']
//

$stats.increment("kpi.brew.total", 1, 1);


if ($event.brewed && $event.brewed.milkAmount) {
	$stats.increment("kpi.brew.withMilk", 1, 1);
}

var userId = $self.id();
if (userId) {
	$stats.increment("kpi.user."+userId+".brewedCoffe", 1, 1);
}
