<script setup lang="ts">
import { ref, watch } from 'vue'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import {
    AdjustmentsHorizontalIcon
} from '@heroicons/vue/24/solid'

import { SongAvailableArray } from '../../common/type'
import filterPopoverAvailableList from './filterPopoverAvailableList.vue'
import filterPopoverRange from './filterPopoverRange.vue'

const emit = defineEmits(['update']);

const filterAvailableArray = ref<SongAvailableArray>({
    msyAvailable: [],
    gilAvailable: [],
    fuluAvailable: [],
});

watch(filterAvailableArray.value, () => {
    emit('update', filterAvailableArray.value)
})

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
                        <filterPopoverAvailableList user="MSY" :available-value="filterAvailableArray.msyAvailable"
                            @update="(value) => filterAvailableArray.msyAvailable = value" />
                        <filterPopoverAvailableList user="GIL" :available-value="filterAvailableArray.gilAvailable"
                            @update="(value) => filterAvailableArray.gilAvailable = value" />
                        <filterPopoverAvailableList user="Fulu" :available-value="filterAvailableArray.fuluAvailable"
                            @update="(value) => filterAvailableArray.fuluAvailable = value" />
                    </div>
                    <div class="border-t-2 border-gray-600 mx-1"></div>
                    <filterPopoverRange />
                </div>
            </PopoverPanel>
        </transition>
    </Popover>
</template>

