<script setup lang="ts">
import { ref, watch } from 'vue'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import {
    AdjustmentsHorizontalIcon
} from '@heroicons/vue/24/solid'

import { FilterArray } from '../../common/type'
import filterPopoverAvailableList from './filterPopoverAvailableList.vue'
import filterPopoverScale from './filterPopoverScale.vue'

const emit = defineEmits(['update']);

const filterArray = ref<FilterArray>({
    songAvailableArray: {
        msyAvailable: [],
        gilAvailable: [],
        fuluAvailable: [],
    },
    songScaleArray: []
})

watch(filterArray.value, () => {
    emit('update', filterArray.value)
})

</script>

<template>
    <Popover v-slot="{ open }" class="relative w-full h-full z-20">
        <PopoverButton :class="open ? '' : 'text-opacity-90'"
            class="w-full h-full flex justify-center rounded border border-gray-500 ">
            <AdjustmentsHorizontalIcon class="h-full w-6 text-white" />
        </PopoverButton>

        <transition>
            <PopoverPanel
                class="absolute left-1/2 z-10 mt-3 w-72 max-w-sm -translate-x-3/4 transform px-4 sm:px-0 lg:max-w-3xl">
                <div class="overflow-hidden rounded-lg shadow-2xl ring-1 ring-black ring-opacity-5">
                    <div class="relative gap-8 p-5  bg-gray-700">
                        <filterPopoverAvailableList user="MSY"
                            :available-value="filterArray.songAvailableArray.msyAvailable"
                            @update="(value) => filterArray.songAvailableArray.msyAvailable = value" />
                        <filterPopoverAvailableList user="GIL"
                            :available-value="filterArray.songAvailableArray.gilAvailable"
                            @update="(value) => filterArray.songAvailableArray.gilAvailable = value" />
                        <filterPopoverAvailableList user="Fulu"
                            :available-value="filterArray.songAvailableArray.fuluAvailable"
                            @update="(value) => filterArray.songAvailableArray.fuluAvailable = value" />
                    </div>
                    <div class="border-t-2 border-gray-600 mx-1"></div>
                    <filterPopoverScale :scale-array="filterArray.songScaleArray"
                        @update="(value) => filterArray.songScaleArray = value" />
                </div>
            </PopoverPanel>
        </transition>
    </Popover>
</template>

