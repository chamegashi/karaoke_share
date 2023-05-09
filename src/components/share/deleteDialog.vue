<script setup lang="ts">
import { ref, watch } from 'vue'
import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
} from '@headlessui/vue'
import { Music } from '../../common/type';

const props = defineProps<{ music: Music, isLoading: boolean, deleteResponce: string }>()
const emit = defineEmits(['close', 'delete']);

const isOpen = ref(true)

function closeModal() {
    isOpen.value = false
    emit('close')
}

function deleteEmit() {
    emit('delete')
}

watch(() => props.deleteResponce, () => {
    if (!props.deleteResponce) {
        return
    }
    closeModal()
});
</script>

<template>
    <TransitionRoot appear :show="isOpen" as="template">
        <Dialog as="div" @close="closeModal" class="relative z-20">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
                leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-black bg-opacity-25" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex min-h-full items-center justify-center p-4 text-center">
                    <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95">
                        <DialogPanel
                            class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                            <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                                さいしゅうつうたつ！
                            </DialogTitle>
                            <div class="mt-2">
                                <p class="text-sm text-gray-500">
                                    以下を消します。良い？
                                </p>
                                <p class="text-sm text-gray-500">
                                    タイトル:{{ music.title }}
                                </p>
                            </div>

                            <div class="mt-4 flex justify-center gap-10">
                                <button type="button"
                                    class="relative rounded-md border bg-red-500 px-4 py-2 text-sm font-medium text-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                                    :class="{ 'bg-red-300': !isLoading, 'bg-red-700': isLoading }" @click="deleteEmit">
                                    消します
                                    <div class="absolute top-3 right-9" v-if="isLoading">
                                        <div className="flex justify-center">
                                            <div className="animate-ping h-3 w-3 bg-white rounded-full"></div>
                                        </div>
                                    </div>
                                </button>
                                <button type="button"
                                    class="rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-blue-800 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                                    @click="closeModal">
                                    キャンセル
                                </button>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>
