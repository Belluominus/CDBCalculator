import { container } from 'tsyringe';

import { IHashProvider } from './HashProvider/IHashProvider';
import { HashProvider } from './HashProvider/implementations/HashProvider';

container.registerInstance<IHashProvider>('HashProvider', new HashProvider());
