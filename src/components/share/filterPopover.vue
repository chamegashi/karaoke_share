<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import {
    XMarkIcon,
    CheckIcon,
    ExclamationTriangleIcon,
    AdjustmentsHorizontalIcon
} from '@heroicons/vue/24/solid'
</script>

<template>
    <Popover v-slot="{ open }" class="relative w-full h-full">
        <PopoverButton :class="open ? '' : 'text-opacity-90'"
            class="w-full h-full flex justify-center rounded border border-gray-500 ">
            <AdjustmentsHorizontalIcon class="h-full w-6 text-white" />
        </PopoverButton>

        <transition>
            <PopoverPanel
                class="absolute left-1/2 z-10 mt-3 w-60 max-w-sm -translate-x-3/4 transform px-4 sm:px-0 lg:max-w-3xl">
                <div class="overflow-hidden rounded-lg shadow-2xl ring-1 ring-black ring-opacity-5">
                    <div class="relative grid gap-8 p-5 lg:grid-cols-2 bg-gray-700">
                        <div class="flex gap-2">
                            <div class="text-white m-auto">
                                MS
                            </div>
                            <button class="border rounded p-1">
                                <CheckIcon class="h-6 w-6 text-green-300 m-auto" />
                            </button>
                            <button class="border rounded p-1">
                                <ExclamationTriangleIcon class="h-6 w-6 text-yellow-300 m-auto" />
                            </button>
                            <button class="border rounded p-1">
                                <XMarkIcon class="h-6 w-6 text-red-300 m-auto" />
                            </button>
                        </div>
                        <div class="flex gap-2">
                            <div class="text-white m-auto">
                                Gi
                            </div>
                            <button class="border rounded p-1">
                                <CheckIcon class="h-6 w-6 text-green-300 m-auto" />
                            </button>
                            <button class="border rounded p-1">
                                <ExclamationTriangleIcon class="h-6 w-6 text-yellow-300 m-auto" />
                            </button>
                            <button class="border rounded p-1">
                                <XMarkIcon class="h-6 w-6 text-red-300 m-auto" />
                            </button>
                        </div>
                        <div class="flex gap-2">
                            <div class="text-white m-auto">
                                Fu
                            </div>
                            <button class="border rounded p-1">
                                <CheckIcon class="h-6 w-6 text-green-300 m-auto" />
                            </button>
                            <button class="border rounded p-1">
                                <ExclamationTriangleIcon class="h-6 w-6 text-yellow-300 m-auto" />
                            </button>
                            <button class="border rounded p-1">
                                <XMarkIcon class="h-6 w-6 text-red-300 m-auto" />
                            </button>
                        </div>
                    </div>
                </div>
            </PopoverPanel>
        </transition>
    </Popover>
</template>

