type Subscriber<T> = {
  id: number;
  fn: (event: T) => void;
};

type BusEvent = {
  name: string;
  payload?: any;
};

function createBus<T>() {
  const subscribers: Subscriber<T>[] = [];
  let idCounter = 0;

  const unsubscribe = ({ id }: Subscriber<T>) => {
    try {
      const subIdx = subscribers.findIndex((sub) => sub.id === id);
      if (subIdx > -1) {
        subscribers.splice(subIdx, 1);
      } else {
        // console.log("- No sub found - ");
        return;
      }

      // console.log(`- Unsubscribed ${id} -`);
      // console.log(`- Subs: ${subscribers.length} -`);
    } catch (e) {
      console.error(e);
    }
  };

  const subscribe = (fn: (event: T) => void) => {
    const subscription = {
      id: idCounter++,
      fn,
    };
    subscribers.push(subscription);
    // console.log(`- Subscription created! ID: ${subscription.id} -`);
    // console.log(`- Subs: ${subscribers.length} -`);
    return { unsubscribe: () => unsubscribe(subscription) };
  };

  const notify = (event: T) => subscribers.forEach(({ fn }) => fn(event));

  return {
    subscribe,
    unsubscribe,
    notify,
  };
}

const bus = createBus<BusEvent>();

export default bus;
