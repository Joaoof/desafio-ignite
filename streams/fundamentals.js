import { Readable } from 'node:stream'

class OneToHundredStream extends Readable {
  index = 1

  _read() {
    const i = this.index++

   setTimeout(() => {
    if (i > 100) {
      this.push(null)
    } else {
      const buf = Buffer.from(String(i))

      this.push(buf) // eu preciso adicionar o BUffer porque ele não aceita string pura
    }
  }, 1000)
}
}

new OneToHundredStream()
.pipe(process.stdout)