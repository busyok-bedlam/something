import passport      from 'koa-passport';
import steamStrategy from './steamStrategy';
import './serialize';

passport.use(steamStrategy);

export default passport;
