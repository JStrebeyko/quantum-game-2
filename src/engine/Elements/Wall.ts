import * as qt from 'quantum-tensors'
import { Elem, Group, TransitionInterface } from '@/engine/interfaces'
import Element from '@/engine/Element'

/**
 * WALL CLASS
 */
export default class Wall extends Element {
  public name: Elem = Elem.Wall
  public group: Group = Group.Absorption
  public description = 'Another brick in the wall.'
  public ascii: string[] = ['▓']
  public angles: number[] = [0]

  public constructor() {
    super(Elem.Wall, Group.Absorption)
  }
  /* eslint-disable-next-line */
  public transition(options: TransitionInterface): qt.Operator {
    return qt.attenuator(0)
  }
}
