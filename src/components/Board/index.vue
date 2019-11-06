<template>
  <svg ref="grid" class="grid" :width="totalWidth" :height="totalHeight">
    <!-- DOTS -->
    <board-dots />

    <!-- LASER PATH -->
    <board-lasers :paths="paths" />

    <!-- CELLS -->
    <app-cell
      v-for="(cell, i) in level.grid.cells"
      :key="'cell' + i"
      :cell="cell"
      :tileSize="tileSize"
      @updateCell="updateCell"
    />

    <!-- PHOTONS -->
    <g
      v-for="(particle, index) in particles"
      :key="'particle' + index"
      :v-if="particles.length > 0"
      :style="computeParticleStyle(particle)"
      class="photons"
    >
      <app-photon
        name
        :particle="particle"
        :intensity="particle.intensity"
        :are="particle.a.re"
        :aim="particle.a.im"
        :bre="particle.b.re"
        :bim="particle.b.im"
        :width="64"
        :height="64"
        :margin="0"
        :display-magnetic="true"
        :display-electric="false"
        :display-gaussian="false"
        :sigma="0.25"
      />
    </g>
    <speech-bubble
      v-for="(hint, index) in level.hints"
      :key="`hint${index}`"
      :hint="hint"
      :tileSize="tileSize"
    />
  </svg>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';
import { Mutation, State } from 'vuex-class';
import Coord from '@/engine/Coord';
import Cell from '@/engine/Cell';
import Grid from '@/engine/Grid';
import Level from '@/engine/Level';
import { ParticleInterface, CellInterface, HintInterface } from '@/engine/interfaces';
import AppCell from '@/components/Board/AppCell.vue';
import BoardLasers from '@/components/Board/BoardLasers.vue';
import BoardDots from '@/components/Board/BoardDots.vue';
import AppPhoton from '@/components/AppPhoton.vue';
import SpeechBubble from '@/components/SpeechBubble.vue';

@Component({
  components: {
    AppCell,
    AppPhoton,
    BoardLasers,
    BoardDots,
    SpeechBubble
  }
})
export default class Board extends Vue {
  @Prop({ default: [] }) readonly particles!: ParticleInterface[];
  @Prop({ default: '' }) readonly paths!: string;
  @State activeCell!: Cell;
  @State level!: Level;
  @Mutation('REMOVE_FROM_CURRENT_TOOLS') mutationRemoveFromCurrentTools!: (cell: Cell) => void;
  @Mutation('UPDATE_GRID_CELL') mutationUpdateGridCell!: (cell: Cell) => void;
  tileSize: number = 64;

  $refs!: {
    grid: HTMLElement;
  };

  mounted() {
    window.addEventListener('resize', this.assessTileSize);
    this.assessTileSize();
  }

  assessTileSize(): void {
    // const currentWidth = this.$refs.grid.getBoundingClientRect().width;
    // this.tileSize = currentWidth / this.grid.cols;
    this.tileSize = 64;
  }

  get totalWidth(): number {
    return this.level.grid.cols * this.tileSize;
  }
  get totalHeight(): number {
    return this.level.grid.rows * this.tileSize;
  }

  /**
   * Compute the cell center at a specific coordinate for grid dots
   * @returns x, y pixel coordinates
   */
  centerCoord(val: number): number {
    return (val + 0.5) * this.tileSize;
  }

  computeParticleStyle(particle: ParticleInterface): {} {
    const originX = this.centerCoord(particle.coord.x);
    const originY = this.centerCoord(particle.coord.y);
    return {
      'transform-origin': `${originX}px ${originY}px`,
      transform: `
        rotate(${particle.direction}deg)
        translate(${particle.coord.x * this.tileSize}px, ${particle.coord.y * this.tileSize}px)`
    };
  }

  /**
   * Used to move or swap cells
   * @params coord to move to
   * @returns boolean
   */
  updateCell(coord: Coord): void {
    const sourceCell = this.activeCell;
    const targetCell = this.level.grid.get(coord);
    const mutatedCells: Cell[] = this.level.grid.move(sourceCell, targetCell);
    mutatedCells.forEach((cell) => {
      this.level.grid.set(cell);
    });
    this.$emit('updateSimulation');
    this.$emit('updateGrid');
  }

  /**
   * Create laser path through the lasers points
   * @returns SVG laser path
   */
  photonPath(): string {
    let pathStr = '';
    if (this.particles.length > 0) {
      const originX = this.centerCoord(this.particles[0].coord.x);
      const originY = this.centerCoord(this.particles[0].coord.y);
      pathStr += `M ${originX} ${originY} `;
    }
    return pathStr;
  }

  // HELPING FUNCTIONS
  element(y: number, x: number): CellInterface {
    const cells = this.level.grid.cells.filter(
      (cell: Cell) => cell.coord.x === x && cell.coord.y === y
    );
    if (cells.length > 0) {
      return cells[0].exportCell();
    }
    return {
      coord: { x, y },
      element: 'Void',
      rotation: 0,
      frozen: false
    };
  }
}
</script>

<style lang="scss" scoped>
.laserPath {
  stroke-dasharray: 8;
  animation-name: dash;
  animation-duration: 4s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-direction: reverse;
}
@keyframes dash {
  to {
    stroke-dashoffset: 64;
  }
}
</style>