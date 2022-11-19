<script lang="ts">
  import ProductLink from "@/components/green-market/product-link.svelte"
  import SlideCarousel from "@/components/slide-carousel/index.svelte"
  import { products } from "@/utility/dummy"

  const datalist = products.map(product => ({ product }))
</script>

<SlideCarousel {datalist} component={ProductLink} />
