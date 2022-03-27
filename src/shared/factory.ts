import AutoEngine from '../domain/engine/specialized/auto.engine';
import BasicEngine from '../domain/engine/basic.engine';
import CommonRulesEngine from '../domain/engine/common-rules.engine';
import DisabilityEngine from '../domain/engine/specialized/disability.engine';
import HomeEngine from '../domain/engine/specialized/home.engine';
import LifeEngine from '../domain/engine/specialized/life.engine';

const makeCommonRuleEngine = () => new CommonRulesEngine(new BasicEngine());

const makeAutoEngine = () => new AutoEngine(makeCommonRuleEngine());
const makeDisabilityEngine = () => new DisabilityEngine(makeCommonRuleEngine());
const makeHomeEngine = () => new HomeEngine(makeCommonRuleEngine());
const makeLifeEngine = () => new LifeEngine(makeCommonRuleEngine());

export {
  makeCommonRuleEngine,
  makeAutoEngine,
  makeDisabilityEngine,
  makeHomeEngine,
  makeLifeEngine
};
