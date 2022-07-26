<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container calificar">
          <!-- <div class="modal-header">
            <slot name="header">
              default header
            </slot>
          </div> -->
          <div class="modal-body">
            <slot name="body">
              <slot name="title">
                title
              </slot>
            </slot>
          </div>
          <div class="modal-footer">
            <button class="Btn" @click="$emit('reactivar')">
              REACTIVAR
            </button>
            <button class="Btn" @click="$emit('desactivar')">
              DESACTIVAR
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
@import "../styles/views/s1.scss";
</style>
