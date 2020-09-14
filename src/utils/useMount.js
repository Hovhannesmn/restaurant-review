import { useEffect } from 'react';

import noop from './noop';

const useMount = (onMount = noop) => useEffect(onMount, []);

export default useMount;
