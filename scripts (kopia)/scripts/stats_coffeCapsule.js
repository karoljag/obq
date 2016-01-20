//
// increment stats about members earning badge
//
// arguments: ['arguments: ["name==brew", "capsuleId"]']
//
var capsuleId = $event.capsuleId;

$stats.increment("kpi.brew." + capsuleId, 1, 1);