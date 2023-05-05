<script setup lang="ts">
import { ref } from 'vue'
import {
    XMarkIcon,
    CheckIcon,
    ExclamationTriangleIcon,
} from '@heroicons/vue/24/solid'

import { SongAvaliable, Users } from '../../common/type'

defineProps<{ user: Users }>()
const emit = defineEmits(['update']);

const filterValues = ref<SongAvaliable[]>([])

const toggleValue = (input: SongAvaliable) => {
    if (filterValues.value.includes(input)) {
        filterValues.value = filterValues.value.filter((value) => {
            return value !== input
        })
    } else {
        filterValues.value.push(input)
    }
    emit('update', filterValues.value)
}

</script>

<template>
    <div class="flex gap-2">
        <div class="text-white m-auto">
            {{ user }}
        </div>
        <button class="border border-gray-400 rounded p-1" @click="toggleValue(2)"
            :class="{ 'bg-gray-500': filterValues.includes(2) }">
            <CheckIcon class=" h-6 w-6 text-green-300 m-auto" />
        </button>
        <button class="border border-gray-400 rounded p-1" @click="toggleValue(1)"
            :class="{ 'bg-gray-500': filterValues.includes(1) }">
            <ExclamationTriangleIcon class="h-6 w-6 text-yellow-300 m-auto" />
        </button>
        <button class="border border-gray-400 rounded p-1" @click="toggleValue(0)"
            :class="{ 'bg-gray-500': filterValues.includes(0) }">
            <XMarkIcon class="h-6 w-6 text-red-300 m-auto" />
        </button>
    </div>
</template>

