<template>
  <div class="toolbox" :cell="cell">
    <!-- <p class="title">
      TOOLBOX
    </p> -->
    <svg
      v-for="(cell, index) in toolbox.uniqueCellList"
      :key="index"
      class="tool"
      :viewBox="viewBox"
      preserveAspectRatio="xMidYMid meet"
      @mouseup="handleCellDrop(toolbox.uniqueCellList[0])"
    >
      <g :class="computeClass(cell)">
        <g>
          <circle :cx="0" :cy="0" r="1" fill="#edeaf4" />
          <circle :cx="0" :cy="64" r="1" fill="#edeaf4" />
          <circle :cx="64" :cy="0" r="1" fill="#edeaf4" />
          <circle :cx="64" :cy="64" r="1" fill="#edeaf4" />
        </g>
        <app-cell
          :cell="cell"
          :available="isAvailable(cell)"
          :tool="true"
          @updateCell="updateCell"
          @mouseover.native="handleMouseEnter(cell)"
        />
        <text class="counter" :x="counterX" y="80">
          × {{ toolbox.getCount(cell.element.name) }}
        </text>
      </g>
    </svg>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Mutation } from 'vuex-class'
import Toolbox from '@/engine/Toolbox'
import AppCell from '@/components/Board/AppCell.vue'
import Cell from '@/engine/Cell'
@Component({
  components: {
    AppCell,
  },
})
export default class GameToolbox extends Vue {
  @Prop() readonly toolbox!: Toolbox
  @Mutation('SET_ACTIVE_CELL') mutationSetActiveCell!: (cell: Cell) => void
  @Mutation('SET_HOVERED_CELL') mutationSetHoveredCell!: (cell: Cell) => void
  cell = {}
  viewBox: string | boolean = '-8 0 80 80'
  counterX = '40%'

  mounted(): void {
    window.addEventListener('resize', this.calculateViewBox)
    this.calculateViewBox()
  }

  handleMouseEnter(cell: Cell): void {
    this.mutationSetHoveredCell(cell)
    this.$emit('hover', { kind: 'element', cell, particles: [], text: 'Drag&drop on board.' })
  }

  handleCellDrop(cell: Cell): void {
    this.mutationSetHoveredCell(cell)
    this.$emit('updateCell', cell)
  }

  computeClass(cell: Cell): string {
    return this.isAvailable(cell) ? 'active' : 'inactive'
  }

  isAvailable(cell: Cell): boolean {
    return this.toolbox.getCount(cell.element.name) > 0
  }

  // events drilling up...
  updateCell(cell: Cell): void {
    this.$emit('updateCell', cell)
  }

  calculateViewBox(): void {
    if (window.innerWidth > 1000) {
      this.viewBox = false
      this.counterX = '50%'
    } else {
      this.viewBox = '-8 0 80 80'
      this.counterX = '40%'
    }
  }
}
</script>

<style lang="scss" scoped>
body {
  overflow-y: hidden;
}
.title {
  color: rgba($color: #fff, $alpha: 1);
  font-weight: 900;
  margin-top: 0px;
  padding-bottom: 15px;
  font-size: 0.8rem;
  text-transform: uppercase;
  width: 100%;
  text-align: center;
  border-top: solid 2px #fff;
  @media screen and (max-width: 1000px) {
    display: none;
  }
}
.toolbox {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
  padding: 5px;
  @media screen and (max-width: 1000px) {
    justify-content: space-evenly;
    border-top: none;
    &::after {
      content: '';
      flex-grow: 99999999;
    }
  }
  .tool-rect {
    fill: #2e006a;
    opacity: 0.5;
  }
  .tool {
    width: 30%;
    min-width: 64px;
    padding: 0.5rem 0rem;
    height: 90px;
    @media screen and (max-width: 1000px) {
      width: 64px;
      padding: 0;
      width: auto;
      min-width: 35px;
      min-height: 0;
      flex-grow: 1;
      flex-basis: 20%;
      height: 15vw;
    }
    .counter {
      transform-origin: 50% 100%;
      fill: white;
      text-anchor: middle;
      margin: 0;
      font-size: 0.8rem;
    }
    .inactive {
      opacity: 0.4;
    }
    .active {
      opacity: 1;
      visibility: visible;
    }
  }
}
</style>
