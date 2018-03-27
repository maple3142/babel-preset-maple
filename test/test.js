const render = h => <div>Hello World</div>

class Counter {
	count = 0
	constructor(count) {
		this.count = count
	}
	increase() {
		this.count++
	}
}

const obj = { a: 1, b: 2 }
console.log({ c: 3, ...obj })
;(async () => {
	console.log(await Promise.resolve(5))
})()
