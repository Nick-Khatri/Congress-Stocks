const states = {
	"Shelley M Capito": "WV",
	"Thomas R Carper": "DE",
	"Gary C Peters": "MI",
	"Pat Roberts": "KS",
	"Patrick J Toomey": "PA",
	"A. Mitchell Mcconnell, Jr.": "KY",
	"Ron L Wyden": "OR",
	"Angus S King, Jr.": "ME",
	"Jerry Moran,": "KS",
	"William Cassidy": "LA",
	"Kelly Loeffler": "GA",
	"David A Perdue , Jr": "GA",
	"Daniel S Sullivan": "AK",
	"Sheldon Whitehouse": "RI",
	"John Hoeven": "ND"
}

function avgHousePurchaseGain() {
	let avg_gains_by_rep = {}
	let total_sum = 0
	let total_purchases = 0
	for(rep in house_data) {
		if(house_data[rep].purchases.length > 0) {
			rep_sum = 0
			rep_purchases = 0
			for(purchase in house_data[rep].purchases) {
				total_sum += house_data[rep].purchases[purchase].gains
				rep_sum += house_data[rep].purchases[purchase].gains
				total_purchases++
				rep_purchases++
			}
			if(rep_purchases > 0) {
				avg_gains_by_rep[rep] = rep_sum / rep_purchases
			}
		}
	}
	calcRepPerformance(avg_gains_by_rep)
	console.log("The average stock purchased by a House Representative in 2020 grew by " + (total_sum / total_purchases).toFixed(2) + "% between the date of purchase and the end of the year.")
}

function calcRepPerformance(list) {
	let beat_market = 0
	let lost_money = 0
	let total_gains = 0
	let total = 0
	for(rep in list) {
		total++
		total_gains += list[rep]
		if(list[rep] > 17.88) {
			beat_market++
		}
		if(list[rep] < 0) {
			lost_money++
		}
	}
	console.log("The average House Representative saw " + (total_gains / total).toFixed(2) + "% growth on their 2020 stock purchases over the year, while the S&P 500 grew by 17.88% over the year")
	console.log((beat_market / total * 100).toFixed(2)  + "% of House Representatives outperformed the S&P 500 in 2020, compared to 39.67% of Large-Cap hedge funds.")
	console.log("Only " + (lost_money / total * 100).toFixed(2) + "%  of House Representatives lost money on their stock purchases.")
}

function avgSenatePurchaseGain() {
	let avg_gains_by_sen = {}
	let total_sum = 0
	let total_purchases = 0
	for(sen in senate_data) {
		if(senate_data[sen].purchases.length > 0) {
			sen_sum = 0
			sen_purchases = 0
			for(purchase in senate_data[sen].purchases) {
				total_sum += senate_data[sen].purchases[purchase].gains
				sen_sum += senate_data[sen].purchases[purchase].gains
				total_purchases++
				sen_purchases++
			}
			if(sen_purchases > 0) {
				avg_gains_by_sen[sen] = sen_sum / sen_purchases
			}
		}
	}
	calcSenPerformance(avg_gains_by_sen)
	console.log("The average stock purchased by a Senator in 2020 grew by " + (total_sum / total_purchases).toFixed(2) + "% between the date of purchase and the end of the year.")
}


function totalAvg() {
	let total_sum = 0
	let total_purchases = 0
	for(sen in senate_data) {
		if(senate_data[sen].purchases.length > 0) {
			for(purchase in senate_data[sen].purchases) {
				total_sum += senate_data[sen].purchases[purchase].gains
				total_purchases++
			}
		}
	}
	for(rep in house_data) {
		if(house_data[rep].purchases.length > 0) {
			for(purchase in house_data[rep].purchases) {
				total_sum += house_data[rep].purchases[purchase].gains
				total_purchases++
			}
		}
	}
	return console.log((total_sum / total_purchases).toFixed(2))
}
function calcSenPerformance(list) {
	let beat_market = 0
	let lost_money = 0
	let total_gains = 0
	let total = 0
	for(sen in list) {
		total++
		total_gains += list[sen]
		if(list[sen] > 17.88) {
			beat_market++
		}
		if(list[sen] < 0) {
			lost_money++
		}
	}
	console.log("The average Senator saw " + (total_gains / total).toFixed(2) + "% growth on their 2020 stock purchases over the year, while the S&P 500 grew by 17.88% over the year")
	console.log((beat_market / total * 100).toFixed(2)  + "% of Senators outperformed the S&P 500 in 2020, compared to 39.67% of Large-Cap hedge funds.")
	console.log("Only " + (lost_money / total * 100).toFixed(2) + "%  of Senators lost money on their stock purchases.")
}

function findRanges() {
	let ranges = []
	for(rep in house_data) {
		for(trade in house_data[rep].purchases) {
			if(ranges.includes(house_data[rep].purchases[trade].amount) === false) {
				ranges.push(house_data[rep].purchases[trade].amount)
			}
		}
	}
	for(rep in senate_data) {
		for(trade in senate_data[rep].purchases) {
			if(ranges.includes(senate_data[rep].purchases[trade].amount) === false) {
				ranges.push(senate_data[rep].purchases[trade].amount)
			}
		}
	}
	console.log(ranges)
}

function findPopularStocks() {
	let stock_list = {}
	for(rep in house_data) {
		if(house_data[rep].purchases.length > 0) {
			for(trade in house_data[rep].purchases) {
				if(house_data[rep].purchases[trade] != undefined) {
					if(stock_list[house_data[rep].purchases[trade].ticker] === undefined) {
						stock_list[house_data[rep].purchases[trade].ticker] = [rangeAvg(house_data[rep].purchases[trade].amount), 1, house_data[rep].purchases[trade].ticker]
					} else {
						stock_list[house_data[rep].purchases[trade].ticker][0] += rangeAvg(house_data[rep].purchases[trade].amount)
						stock_list[house_data[rep].purchases[trade].ticker][1] += 1
					}
				}
			}
		}
	}
	for(sen in senate_data) {
		for(trade in senate_data[sen].purchases) {
			if(stock_list[senate_data[sen].purchases[trade].ticker] === undefined) {
				stock_list[senate_data[sen].purchases[trade].ticker] = [rangeAvg(senate_data[sen].purchases[trade].amount), 1, senate_data[sen].purchases[trade].ticker]
			} else {
				stock_list[senate_data[sen].purchases[trade].ticker][0] += rangeAvg(senate_data[sen].purchases[trade].amount)
				stock_list[senate_data[sen].purchases[trade].ticker][1] += 1
			}
		}
	}
	let ordered = Object.values(stock_list).sort(compare)
	let top_10 = []
	for(let i = 1; i < 11; i++) {
		top_10.push(ordered[ordered.length - i])
	}
	return top_10
}

function compare(a, b) {
	if(a[1] > b[1]) {
		return 1
	}
	if(b[1] < a[1]) {
		return -1
	}
	return 0
}

function rangeAvg(range) {
	switch(range) {
		case "$1,001 -":
			return 8000
		case "$1,001 - $15,000":
			return 8000
		case "$15,001 - $50,000":
			return 32500
		case "$50,001 - $100,000":
			return 75000
		case "$100,001 - $250,000":
			return 175000
		case "$250,001 - $500,000":
			return 375000
		case "$500,001 - $1,000,000":
			return 750000
		case "$1,000,001 - $5,000,000":
			return 3000000
		case "$5,000,001 - $25,000,000":
			return 15000000
	}
}

function popularityTable() {
	const names = [
		"Microsoft Corporation",
		"Apple Inc",
		"Amazon.com, Inc.",
		"Walt Disney Co",
		"Facebook, Inc. Common Stock",
		"NVIDIA Corporation",
		"Costco Wholesale Corporation",
		"Usa Compression Partners LP",
		"NGL Energy Partners LP",
		"Netflix Inc",
		
	]
	let stonks = findPopularStocks()
	let rows = document.getElementsByClassName('popularity_row')
	for(let i = 0; i < rows.length; i++) {
		let string = ""
		string += "<td>"+(i + 1)+"</td>"
		string += "<td>"+names[i]+"</td>"
		string += "<td>"+stonks[i][2]+"</td>"
		string += "<td style='text-align:center;'>"+stonks[i][1]+"</td>"
		string += "<td style='text-align:center;'>$ "+formatCost(stonks[i][0])+"</td>"
		rows[i].innerHTML = string
	}
}

function formatCost(cost) {
	let cost_string = cost.toString()
	if(cost_string.length > 3) {
		let string
		string = cost_string.slice(0, cost_string.length - 3)+"," +cost_string.slice(cost_string.length - 3)
		cost_string = string
	}
	if(cost_string.length > 7) {
		let string
		string = cost_string.slice(0, cost_string.length - 7)+"," +cost_string.slice(cost_string.length - 7)
		cost_string = string
	}
	return cost_string
}

function houseList() {
	const house_list = document.getElementById('house_list')
	let string = "<tr><th style='text-align:center;width:50%'>Name</th><th style='text-align:center'>District</th></tr>"
	let nph = false
	let chamber = '"house"'
	for(rep in house_data) {
		if(rep === "Neal Patrick Dunn MD, FACS" || rep === "Neal Patrick MD, FACS Dunn" || rep === "Neal Patrick MD, Facs Dunn") {
			if(nph === false) {
				nph = true
				let name = '"nph"'
				string +="<tr class='mem_row' onclick='indivTable("+name+", "+chamber+")'><td style='text-align:center'>Neal Patrick Dunn</td>"
				string +="<td style='text-align:center'>"+house_data[rep].district+"</td></tr>"
			}
		} else {
			if(house_data[rep].purchases.length > 0) {
				let name = '"'+rep+'"'
				string +="<tr class='mem_row' onclick='indivTable("+name+", "+chamber+")'><td style='text-align:center'>"+rep+"</td>"
				string +="<td style='text-align:center'>"+house_data[rep].district+"</td></tr>"
			}
		}
	}
	house_list.innerHTML = string
}

function senateList() {
	const senate_list = document.getElementById('senate_list')
	let string = "<tr><th style='text-align:center;width:50%'>Name</th><th style='text-align:center'>State</th></tr>"
	let chamber = '"senate"'
	for(sen in senate_data) {
		if(senate_data[sen].purchases.length > 0) {
			let name = '"'+sen+'"'
			if(sen === "Jerry Moran,") {
				name = '"Jerry Moran,"'
				string +="<tr class='mem_row' onclick='indivTable("+name+", "+chamber+")'><td style='text-align:center'>Jerry Moran</td>"
			} else {
				string +="<tr class='mem_row' onclick='indivTable("+name+", "+chamber+")'><td style='text-align:center'>"+sen+"</td>"
			}
			string +="<td style='text-align:center'>"+states[sen]+"</td></tr>"
		}
	}
	senate_list.innerHTML = string
}

function indivTable(name, chamber) {
	if(name === "nph") {return printNPH()}
	let indiv_table = document.getElementById('indiv_trades')
	let indiv_info = document.getElementById('indiv_info')
	let data
	let string = ""
	if(chamber === "house") {
		data = house_data
	}
	if(chamber === "senate") {
		data = senate_data
	}
	string += "<tr><th style='text-align:center'>Stock</th><th style='text-align:center'>Purchase Date</th><th style='text-align:center'>Amount</th></tr>"
	for(purchase in data[name].purchases) {
		string += "<tr><td style='text-align:center'>"+data[name].purchases[purchase].ticker+"</td>"
		string += "<td style='text-align:center'>"+data[name].purchases[purchase].date+"</td>"
		string += "<td style='text-align:center'>"+data[name].purchases[purchase].amount+"</td></tr>"
	}
	indiv_table.innerHTML = string
	if(chamber === "house") {
		indiv_info.innerHTML = name+" ("+data[name].district+") - Reported Stock Purchases 2020"
	}
	if(chamber === "senate") {
		if(name === "Jerry Moran,") {
			indiv_info.innerHTML = "Jerry Moran ("+states[name]+") - Reported Stock Purchases 2020"
		} else {
			indiv_info.innerHTML = name+" ("+states[name]+") - Reported Stock Purchases 2020"
		}
	}
	changePage("indiv_data")
}

function printNPH() {
	let indiv_table = document.getElementById('indiv_trades')
	let indiv_info = document.getElementById('indiv_info')
	let string = ""
	let data = house_data
	string += "<tr><th style='text-align:center'>Stock</th><th style='text-align:center'>Purchase Date</th><th style='text-align:center'>Amount</th></tr>"
	for(purchase in data["Neal Patrick Dunn MD, FACS"].purchases) {
		string += "<tr><td style='text-align:center'>"+data["Neal Patrick Dunn MD, FACS"].purchases[purchase].ticker+"</td>"
		string += "<td style='text-align:center'>"+data["Neal Patrick Dunn MD, FACS"].purchases[purchase].date+"</td>"
		string += "<td style='text-align:center'>"+data["Neal Patrick Dunn MD, FACS"].purchases[purchase].amount+"</td></tr>"
	}
	for(purchase in data["Neal Patrick MD, FACS Dunn"].purchases) {
		string += "<tr><td style='text-align:center'>"+data["Neal Patrick MD, FACS Dunn"].purchases[purchase].ticker+"</td>"
		string += "<td style='text-align:center'>"+data["Neal Patrick MD, FACS Dunn"].purchases[purchase].date+"</td>"
		string += "<td style='text-align:center'>"+data["Neal Patrick MD, FACS Dunn"].purchases[purchase].amount+"</td></tr>"
	}
	for(purchase in data["Neal Patrick MD, Facs Dunn"].purchases) {
		string += "<tr><td style='text-align:center'>"+data["Neal Patrick MD, Facs Dunn"].purchases[purchase].ticker+"</td>"
		string += "<td style='text-align:center'>"+data["Neal Patrick MD, Facs Dunn"].purchases[purchase].date+"</td>"
		string += "<td style='text-align:center'>"+data["Neal Patrick MD, Facs Dunn"].purchases[purchase].amount+"</td></tr>"
	}
	indiv_table.innerHTML = string
	indiv_info.innerHTML = "Neal Patrick Dunn (FL02) - Reported Stock Purchases 2020"
	changePage("indiv_data")
}

function changePage(page) {
	window.scrollTo(0, 0)
	if(page === "indiv_data") {
		document.getElementById('aggregate').style.display="none"
		document.getElementById('individual').style.display="none"
		document.getElementById('indiv_data').style.display="block"
		document.getElementById('about').style.display="none"
	}
	if(page === "aggregate") {
		document.getElementById('aggregate').style.display="block"
		document.getElementById('individual').style.display="none"
		document.getElementById('indiv_data').style.display="none"
		document.getElementById('about').style.display="none"
	}
	if(page === "individual") {
		document.getElementById('aggregate').style.display="none"
		document.getElementById('individual').style.display="block"
		document.getElementById('indiv_data').style.display="none"
		document.getElementById('about').style.display="none"
	}
	if(page === "about") {
		document.getElementById('aggregate').style.display="none"
		document.getElementById('individual').style.display="none"
		document.getElementById('indiv_data').style.display="none"
		document.getElementById('about').style.display="block"
	}
}

function init() {
	popularityTable()
	houseList()
	senateList()
}