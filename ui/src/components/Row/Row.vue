<template>
  <div class="page-builder-row"
       :class="{'boxed': options?.boxed?.value, 'editable': editable, 'boxedInFullWidthStatus': boxedInFullWidthStatus}"
       :style="options?.style"
  >
    <div class="row"
         :id="defaultOptions.id"
    >
      <editor-box v-if="editable"
                  :label="'row'"
                  @callAction="callAction"
      />
      <page-builder-col v-for="(col, colIndex) in cols"
                        :key="'colIndex'+colIndex"
                        v-model:options="col.options"
                        v-model:widgets="col.widgets"
                        :get-data="getData"
                        :editable="editable"
                        @onOptionAction="onOptionAction($event, {widget: col, widgetIndex: colIndex, name: 'col'})"
      />
    </div>
  </div>
</template>

<script>
import EditorBox from '../EditorBox.vue'
import PageBuilderCol from '../Col/Col.vue'
import mixinWidget from '../../mixin/Widgets'

export default {
  name: 'PageBuilderRow',
  mixins: [mixinWidget],
  components: {
    PageBuilderCol,
    EditorBox,
  },
  emits: ['onOptionAction'],
  props: {
    cols: {
      type: Object,
      default: () => {
        return {}
      }
    },
    getData: {
      type: Function,
      default: () => {
      }
    },
    options: {
      type: Object,
      default: () => {
      }
    }
  },
  data() {
    return {
      deviceWidth: 1920,
      boxedInFullWidthStatus: false,
      form: {},
      action: '',
      eventCol: {},
      elementFormDialog: false,
      defaultOptions: {
        height: 'auto',
        boxedWidth: 1200
      }
    }
  },
  created() {
    this.updateBoxedStyle()
    window.addEventListener('resize', () => {
      this.updateBoxedStyle()
    })
  },
  methods: {
    updateBoxedStyle() {
      this.deviceWidth = window.innerWidth
      if (!this.defaultOptions.boxed) {
        return
      }

      this.defaultOptions.style.maxWidth = this.defaultOptions.boxedWidth + 'px'
      this.defaultOptions.style.width = this.defaultOptions.boxedWidth + 'px'
      this.boxedInFullWidthStatus = this.deviceWidth <= this.defaultOptions.boxedWidth
    },
    onResize() {
      this.updateBoxedStyle()
    },
    onSubmitElement(widget) {
      const widgetData = widget.item.type === 'widget' ? widget.item : widget.item.info
      if (widget.item.info !== undefined) {
        widgetData.options = widget.options
      }
      if (this.action === 'add') {
        this.$props.cols[this.eventCol.colIndex].widgets.push(widgetData)
      } else if (this.action === 'edit') {
        this.$props.cols[this.eventCol.colIndex] = widgetData
      }
      this.elementFormDialog = false
    },
    callAction(event) {
      const path = {
        node: 'data.rows',
      }
      const data = {
        event,
        path,
        name: 'row'
      }
      this.$emit('onOptionAction', data)
    },
    onOptionAction (data, widgetItem) {
      const event = data.event
      data.path.index = data.widgetIndex ? data.widgetIndex : widgetItem.widgetIndex
      const path = {
        node: 'data.rows',
        child: data.path
      }
      const emitData = {
        event,
        path,
        name: data.name,
        nodeName: data.nodeName,
        widget: data.widget ? data.widget : widgetItem.widget,
        widgetIndex: data.widgetIndex ? data.widgetIndex : widgetItem.widgetIndex
      }
      this.$emit('onOptionAction', emitData)
    }
  }
}
</script>

<style lang="scss" scoped>
.page-builder-row {
  position: relative;
  //:deep(.widget-editor-box) {
  //  display: none;
  //}
  //&:hover {
  //  :deep(.widget-editor-box) {
  //    display: block;
  //  }
  //}
  &.editable {
    border: dashed 2px $primary;
    padding-top: 40px;
  }
  &.boxed {
    max-width: 1200px;
    margin-right: auto;
    margin-left: auto;
    width: 1200px;

    &.boxedInFullWidthStatus {
      padding-right: 15px;
      padding-left: 15px;
      max-width: 100% !important;
      width: 100% !important;
    }
  }
}
</style>