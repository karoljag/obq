# OTHER
## Subscribe to a newsletter

```javascript
{
	"tm": 3641671256,
	"name":"subscribeNL"
}
```

## Tutorial passed

```javascript
{
	"tm": 3641671256,
	"name":"tutorialPassed"
}
```

## Setup as an admin

```javascript
{
	"tm": 3641671256,
	"name":"setupAsAdmin",
	"admin":
	{
		"aid": "default-1",
		"adminId":"uuid",
	},
}
```

## Milk element attached

```javascript
{
	"tm": 3641671257,
	"name":"milkElementAttached",
}
```

## User logged in today

```javascript
{
	"tm": 3641671243,
	"name":"loggedIn"
}
```

---

# FREQUENCY

## Buy

```javascript
{
	"tm": 3641671256,
	"name":"buy", 
	"product":
	{
		"name": "accessory", //coffe capsule, cleaning capsule, descaling capsule
		"productAmount": "1",
		"buyTimestamp": 1410767140,
	}
}
```

## Brew & milk consume

```javascript
{
	"tm": 3641671232,
	"name":"brew",
	"machineId":"uuid",
	"version": "v1_2",
	"capsuleId":866,
	"recipe": // normal recipe JSON
	{
		"name": "Flat White",
		"milkAmount": 20,
		"defaultRecipe": 1
	},
	"brewed": {
		"cancelled": 1, // 0: no, 1: yes
		"milkAmount": 20
	}
}
```

---

# TRIAL

## Brew a pre-test

```javascript
{
	"tm": 3641671232,
	"name":"brew",
	"recipe":
	{
		"name": "Flat White",
		"pretest": 1 // 0: no, 1: yes
	},
	"brewed": {
		"cancelled": 1
	}
}
```

## Participate in a poll

```javascript
{
	"tm": 3641671256,
	"name":"pollParticipate"
}
```

## Participate in a survey 

```javascript
{
	"tm": 3641671256,
	"name":"surveyParticipate"
}
```

---

# SOCIAL

##  Tell a friend 

```javascript
{
	"tm": 3641671256,
	"name":"tellFriend",
}
```

## Add a recipe to favourites

```javascript
{
	"tm": 3641671256,
	"name":"addFavouriteRecipe",
	"recipe":
	{
		"name": "Flat White"
	}
}
```

## Share a recipe

```javascript
{
	"tm": 3641671256,
	"name":"shareRecipe",
	"recipe":
	{
		"name": "Flat White"
	}
}
```

## Create a recipe

```javascript
{
	"tm": 3641671256,
	"name":"createRecipe"
}
```

---

# MAINTENANCE

## Cleaning

```javascript
{
	"tm": 3641671232,
	"name":"clean"
}
```

## Descaling

```javascript
{
	"tm": 3641671256,
	"name":"descale"
}
```

## Rinsing

```javascript
{
	"tm": 3641671243,
	"name":"longRinse"
}
```