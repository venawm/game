class Events {
  callbacks = [];
  nextId = 0;

  // emit event
  emit(eventName, value) {
    this.callbacks.forEach((stored) => {
      if (stored.eventName === eventName) {
        stored.callback(value);
      }
    });
  }

  // subscribe to something happening
  on(eventName, caller, callback) {
    this.nextId += 1;
    this.callbacks.push({
      id: this.nextId,
      eventName,
      caller,
      callback,
    });
    return this.nextId;
  }

  // remove the subscription
  off(id) {
    this.callbacks = this.callbacks.filter((stored) => stored.id !== id);
  }

  unsubscribe(caller) {
    this.callbacks = this.callbacks.filter(
      (stored) => stored.caller !== caller,
    );
  }
}

export const events = new Events();
