<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import {
    EllipsisHorizontalIcon,
    PencilIcon,
    ArchiveBoxXMarkIcon,
} from '@heroicons/vue/24/solid'

// defineProps<{}>()

</script>

<template>
    <Menu as="div" class="relative text-left w-full h-full">
        <MenuButton>
            <EllipsisHorizontalIcon class="w-7 h-7 text-gray-300" />
        </MenuButton>

        <transition>
            <MenuItems
                class="absolute right-0 w-24 translate-y-1 translate-x-1 origin-top-right divide-y divide-gray-100 rounded-md bg-gray-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                <div class="px-1 py-1">
                    <MenuItem v-slot="{ active }">
                    <button :class="[
                            active ? 'bg-gray-500 text-white' : 'text-gray-900',
                            'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                        ]" @click="$emit('update', 0)">
                        <PencilIcon class="w-5 h-5 text-gray-300 mr-2" />
                        <p class="text-gray-200 text-lg">編集</p>
                    </button>
                    </MenuItem>
                    <div class="border border-gray-600"></div>
                    <MenuItem v-slot="{ active }">
                    <button :class="[
                            active ? 'bg-red-500 text-white' : 'text-gray-900',
                            'group flex w-full items-center rounded-md px-2 py-2',
                        ]" @click="$emit('update', 1)">
                        <ArchiveBoxXMarkIcon class="w-5 h-5 text-red-400 mr-2" />
                        <p class="text-red-400 text-lg">削除</p>
                    </button>
                    </MenuItem>
                </div>
            </MenuItems>
        </transition>
    </Menu>
</template>