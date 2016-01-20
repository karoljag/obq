/*
 * description: The script increments the usage counter.
 * arguments: ["name"=="loggedIn"]
 */


/*
1. sprawdzenie czy user logowal się wczoraj
2. jesli nie to reset counter
3. jesli tak to inc, zapis daty
4. sprawdzenie przedzialow dla countera i przyznanie badge
*/
var lastLoginDate = $self.properties().get('lastLogin'),
	currDate = new Date();

if (!lastLoginDate) {
	$self.properties().put('lastLogin', currDate.toISOString());
	$self.counters().inc('usage');
} else {
	var currDay = currDate.getDate(),
		lastLoginDay = new Date(lastLoginDate).getDate();
	
	if (currDay-1 === lastLoginDay){ //jesli logowanie wczoraj to counter +1
		$self.counters().inc('usage');
	} else if (currDay-1 > lastLoginDay) { //jesli logowanie wiecej niz 1 dzień temu to reset countera
		$self.counters().set('usage', 0);
	}
}





