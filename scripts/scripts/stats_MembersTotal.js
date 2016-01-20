//
// increment stats about members enrolled
//
// arguments: ['name==subscribeNL']
//

$stats.increment("kpi.members.total", 1, 1);

//var member = $self.id();
//if(member) {
//	$stats.increment("kpi.user."+member+".enrolled", 1, 1);
//}