class ActivityBuilder {
  constructor () {
    this.buttons = []
    this.largeImageKey = 'libriatyan03'
  }

  firstLine (text) {
    this.details = text
  }

  secondLine (text) {
    this.state = text
    this.largeImageText = text
  }

  start (date) {
    this.startTimestamp = date
  }

  end (date) {
    this.endTimestamp = date
  }

  firstButton (label, url) {
    this.buttons[0] = {
      label,
      url
    }
  }

  secondButton (label, url) {
    this.buttons[1] = {
      label,
      url
    }
  }
}

export { ActivityBuilder }
