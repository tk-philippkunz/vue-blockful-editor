<template>
  <span
    class="w-full textarea"
    :class="{
      'text-left':
        modelValue.data.textAlign == null ||
        modelValue.data.textAlign === 'left',
      'text-center': modelValue.data.textAlign === 'center',
      'text-right': modelValue.data.textAlign === 'right',
      'text-sm':
        modelValue.data.fontSize == null ||
        modelValue.data.fontSize === '0.8em',
      'text-base': modelValue.data.fontSize === '1em',
      'text-lg': modelValue.data.fontSize === '1.2em',
      'text-xl': modelValue.data.fontSize === '1.4em',
      'text-2xl': modelValue.data.fontSize === '2em',
    }"
    role="textbox"
    ref="spanElement"
    :contenteditable="!readOnly"
    @input="updateText($event)"
  >
    {{ text }}
  </span>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { BlockParagraph } from './types';

const emit = defineEmits(['update:modelValue']);
const props = defineProps<{
  readOnly: boolean;
  modelValue: BlockParagraph;
}>();

const spanElement = ref<HTMLSpanElement | null>(null);

const text = ref(props.modelValue.data.text);

const updateText = (e: Event) => {
  const txt = (e.target as HTMLDivElement).innerText;
  emit('update:modelValue', {
    ...props.modelValue,
    data: {
      ...props.modelValue.data,
      text: txt,
    },
  });
};

watch(props.modelValue, () => {
  text.value = props.modelValue.data.text;
});

// ensure the element is focused after being rendered
onMounted(() => {
  spanElement.value?.focus();
})
</script>

<style>
/* HACK replace with tailwind */
.textarea {
  display: block;
  overflow: hidden;
  resize: both;
  min-height: 40px;
  line-height: 20px;
}
</style>
