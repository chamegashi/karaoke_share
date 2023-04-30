<script setup lang="ts">
import { AdjustmentsHorizontalIcon } from '@heroicons/vue/24/solid'
import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid'
import { PlusIcon } from '@heroicons/vue/24/solid'

const header = ["曲", "MS", "GI", "Fu"]

const music = {
    "id": 1,
    "music": "ANIMA",
    "artist": "ReoNa",
    "maxkey": "hiC",
}

const items = [
    {
        "music": music,
        "massann": 0,
        "GIL": 1,
        "Fulu": 2,
    },
    {
        "music": music,
        "massann": 0,
        "GIL": 1,
        "Fulu": 2,
    },
    {
        "music": music,
        "massann": 0,
        "GIL": 1,
        "Fulu": 2,
    },
    {
        "music": music,
        "massann": 0,
        "GIL": 1,
        "Fulu": 2,
    },
    {
        "music": music,
        "massann": 0,
        "GIL": 1,
        "Fulu": 2,
    },
    {
        "music": music,
        "massann": 0,
        "GIL": 1,
        "Fulu": 2,
    },
    {
        "music": music,
        "massann": 0,
        "GIL": 1,
        "Fulu": 2,
    },
    {
        "music": music,
        "massann": 0,
        "GIL": 1,
        "Fulu": 2,
    },
    {
        "music": music,
        "massann": 0,
        "GIL": 1,
        "Fulu": 2,
    },
    {
        "music": music,
        "massann": 0,
        "GIL": 1,
        "Fulu": 2,
    },
    {
        "music": music,
        "massann": 0,
        "GIL": 1,
        "Fulu": 2,
    },
    {
        "music": music,
        "massann": 0,
        "GIL": 1,
        "Fulu": 2,
    },
    {
        "music": music,
        "massann": 0,
        "GIL": 1,
        "Fulu": 2,
    },
    {
        "music": music,
        "massann": 0,
        "GIL": 1,
        "Fulu": 2,
    },
    {
        "music": music,
        "massann": 0,
        "GIL": 1,
        "Fulu": 2,
    },
    {
        "music": music,
        "massann": 0,
        "GIL": 1,
        "Fulu": 2,
    },
    {
        "music": music,
        "massann": 0,
        "GIL": 1,
        "Fulu": 2,
    },
    {
        "music": music,
        "massann": 0,
        "GIL": 1,
        "Fulu": 2,
    },
    {
        "music": music,
        "massann": 0,
        "GIL": 1,
        "Fulu": 2,
    },
    {
        "music": music,
        "massann": 0,
        "GIL": 1,
        "Fulu": 2,
    },
    {
        "music": music,
        "massann": 0,
        "GIL": 1,
        "Fulu": 2,
    },
    {
        "music": music,
        "massann": 0,
        "GIL": 1,
        "Fulu": 2,
    },
    {
        "music": music,
        "massann": 0,
        "GIL": 1,
        "Fulu": 2,
    },
]

</script>

<template>
    <div class="relative bg-gray-700 h-screen">

        <!-- search -->
        <div class="flex pt-4 mx-4 mb-3">
            <div class="bg-white w-5/6 rounded p-1 mr-2">
                <MagnifyingGlassIcon class="h-6 w-6 text-gray-700" />
            </div>
            <div class="w-1/6 rounded border border-gray-500 ">
                <AdjustmentsHorizontalIcon class="h-full w-6 text-white m-auto" />
            </div>
        </div>

        <div class="relative mx-2 overflow-auto h-5/6">
            <table class="w-full">
                <thead class="py-2">
                    <tr class="text-gray-200">
                        <th class="w-9/12 py-2 sticky top-0 border-b-2 border-gray-300 bg-gray-700">{{ header[0] }}</th>
                        <th class="w-1/12 sticky top-0 border-b-2 border-gray-300 bg-gray-700">{{ header[1] }}</th>
                        <th class="w-1/12 sticky top-0 border-b-2 border-gray-300 bg-gray-700">{{ header[2] }}</th>
                        <th class="w-1/12 sticky top-0 border-b-2 border-gray-300 bg-gray-700">{{ header[3] }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in items" :key="item.music.id" class="text-gray-200 border-b-2 border-gray-400">
                        <td class="py-2">
                            <p class="pl-1">{{ music.music }}</p>
                            <div class="flex">
                                <p class="pl-1 w-4/6 text-xs text-gray-400">{{ music.artist }}</p>
                                <p class="pl-1 w-2/6 text-xs text-gray-400">maxkey: {{ music.maxkey }}</p>
                            </div>
                        </td>
                        <td class="text-center bg-gray-600">{{ item.massann }}</td>
                        <td class="text-center">{{ item.GIL }}</td>
                        <td class="text-center bg-gray-600">{{ item.Fulu }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- button -->
        <button class="absolute bottom-4 left-2/4 -translate-x-2/4 p-2 rounded-full bg-blue-500">
            <PlusIcon class="w-8 h-8 text-white" />
        </button>

    </div>
</template>