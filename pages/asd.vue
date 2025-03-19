<template>
    <div>
        hi
        <input type="file" @input="handleFileInput" accept="image/*" />
        <button @click="submit">ok</button>
    </div>
</template>
<script lang="ts" setup>
const { handleFileInput, files } = useFileStorage()
const submit = () => {
    console.log(files.value);
    
}
</script>