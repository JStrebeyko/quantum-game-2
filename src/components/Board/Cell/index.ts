import AbsorberCell from './AbsorberCell.vue'
import BeamSplitterCell from './BeamSplitterCell.vue'
import MineCell from './MineCell.vue'
import CoatedBeamSplitterCell from './CoatedBeamSplitterCell.vue'
import CornerCubeCell from './CornerCubeCell.vue'
import DetectorCell from './DetectorCell.vue'
import LaserCell from './LaserCell.vue'
import GlassCell from './GlassCell.vue'
import MirrorCell from './MirrorCell.vue'
import DetectorFourCell from './DetectorFourCell.vue'
import PolarizerCell from './PolarizerCell.vue'
import PolarizingBeamSplitterCell from './PolarizingBeamSplitterCell.vue'
import RockCell from './RockCell.vue'
import SugarSolutionCell from './SugarSolutionCell.vue'
import VacuumJarCell from './VacuumJarCell.vue'
import QuarterWavePlateCell from './QuarterWavePlateCell.vue'
import HalfWavePlateCell from './HalfWavePlateCell.vue'
import FaradayRotatorCell from './FaradayRotatorCell.vue'
import NonLinearCrystalCell from './NonLinearCrystalCell.vue'

export { AbsorberCell }
export { BeamSplitterCell }
export { MineCell }
export { CoatedBeamSplitterCell }
export { CornerCubeCell }
export { DetectorCell }
export { LaserCell }
export { GlassCell }
export { MirrorCell }
export { DetectorFourCell }
export { PolarizerCell }
export { PolarizingBeamSplitterCell }
export { RockCell }
export { SugarSolutionCell }
export { VacuumJarCell }
export { QuarterWavePlateCell }
export { HalfWavePlateCell }
export { FaradayRotatorCell }
export { NonLinearCrystalCell }

// FIXME: Code smell move to interfaces
interface ICellList {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [index: string]: Record<string, any>
}

const CellList: ICellList = {
  LaserCell,
  MirrorCell,
  BeamSplitterCell,
  PolarizingBeamSplitterCell,
  CoatedBeamSplitterCell,
  CornerCubeCell,
  DetectorCell,
  RockCell,
  MineCell,
  AbsorberCell,
  DetectorFourCell,
  PolarizerCell,
  QuarterWavePlateCell,
  HalfWavePlateCell,
  SugarSolutionCell,
  GlassCell,
  VacuumJarCell,
  FaradayRotatorCell,
  NonLinearCrystalCell,
}

export default CellList
