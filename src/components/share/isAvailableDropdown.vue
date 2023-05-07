<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { SongAvailable } from '../../common/type'
import {
    XMarkIcon,
    CheckIcon,
    ExclamationTriangleIcon,
    QuestionMarkCircleIcon,
} from '@heroicons/vue/24/solid'

defineProps<{ availableNum: SongAvailable }>()

</script>

<template>
    <Menu as="div" class="relative text-left w-full h-full">
        <MenuButton class="w-full h-full flex justify-center">
            <QuestionMarkCircleIcon v-if="availableNum === 3" class="h-6 w-6 text-gray-300 m-auto" />
            <CheckIcon v-if="availableNum === 2" class="h-6 w-6 text-green-300 m-auto" />
            <ExclamationTriangleIcon v-if="availableNum === 1" class="h-6 w-6 text-yellow-300 m-auto" />
            <XMarkIcon v-if="availableNum === 0" class="h-6 w-6 text-red-300 m-auto" />
        </MenuButton>

        <transition>
            <MenuItems
                class="absolute right-0 mt-2 w-12 rotate-90 translate-y-12 translate-x-1 origin-top-right divide-y divide-gray-100 rounded-md bg-gray-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                <div class="px-1 py-1">
                    <MenuItem v-slot="{ active }">
                    <button :class="[
                            active ? 'bg-red-500 text-white' : 'text-gray-900',
                            'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                        ]" @click="$emit('update', 0)">
                        <XMarkIcon class="h-6 w-6 -rotate-90 text-red-300 m-auto" />
                    </button>
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                    <button :class="[
                            active ? 'bg-yellow-500 text-white' : 'text-gray-900',
                            'group flex w-full items-center rounded-md px-2 py-2',
                        ]" @click="$emit('update', 1)">
                        <ExclamationTriangleIcon class="h-6 w-6 -rotate-90 text-yellow-300 m-auto" />
                    </button>
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                    <button :class="[
                            active ? 'bg-green-500 text-white' : 'text-gray-900',
                            'group flex w-full items-center rounded-md px-2 py-2',
                        ]" @click="$emit('update', 2)">
                        <CheckIcon class="h-6 w-6 -rotate-90 text-green-300 m-auto" />
                    </button>
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                    <button :class="[
                            active ? 'bg-green-500 text-white' : 'text-gray-900',
                            'group flex w-full items-center rounded-md px-2 py-2',
                        ]" @click="$emit('update', 3)">
                        <QuestionMarkCircleIcon class="h-6 w-6 -rotate-90 text-gray-300 m-auto" />
                    </button>
                    </MenuItem>
                </div>
            </MenuItems>
        </transition>
    </Menu>
</template>