<template>
  <div>
    Index Page
    <div class="common-text-base">
      Test
    </div>
    <br>
    <Card />
    <br>
    <section class="scene">
      <grid view="amara">
        <grid-item>
          <Feature title="First Feature" sub-title="First feature description" />
        </grid-item>
        <grid-item>
          <Feature title="Second Feature" sub-title="Second feature description" />
        </grid-item>
        <grid-item>
          <Feature title="Third Feature" sub-title="Third feature description" />
        </grid-item>
      </grid>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'IndexPage',
  }
</script>
