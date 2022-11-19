<script lang="ts">
  import EnlargeableGallery from "@/components/enlargeable-gallery/index.svelte"
  import ProductLink from "@/components/green-market/product-link.svelte"
  import ProductFlipCard from "./product-flip-card.svelte"
  import { products04 } from "@/utility/dummy"

  const propslist = products04.map(product => ({ product }))
</script>

<EnlargeableGallery
  enlargedComponent={ProductLink}
  thumbComponent={ProductFlipCard}
  {propslist}
/>
