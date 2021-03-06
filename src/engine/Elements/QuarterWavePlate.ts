import * as qt from 'quantum-tensors'
import { Elem, Group, ITransition } from '@/engine/interfaces'
import Element from '@/engine/Element'

/**
 * QUARTER WAVE PLATE CLASS
 */
export default class QuarterWavePlate extends Element {
  public name: Elem = Elem.QuarterWavePlate
  public group: Group = Group.Polarization
  public description =
    'It delays one polarization (with darker lines) by λ/4. When applied correctly, it can change linear polarization into circular, and vice versa.'

  public ascii: string[] = ['▤', '▨', '▥', '▧', '▤', '▨', '▥', '▧']
  public angles: number[] = [0, 45, 90, 135, 180, 225, 270, 315]

  public constructor() {
    super(Elem.QuarterWavePlate, Group.Polarization)
  }

  public transition(options: ITransition): qt.Operator {
    return qt.Operator.add([
      qt.Elements.quarterWavePlateWE(options.rotation),
      qt.Elements.quarterWavePlateNS(options.rotation + 90),
    ])
  }
}
