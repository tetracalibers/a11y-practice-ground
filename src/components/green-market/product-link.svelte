<script lang="ts">
  import { Product } from "@/utility/dummy"
  import { formatPrice } from "./utility/format-text"

  export let product: Product
</script>

<a href={product.page_url} class={[$$props.class, "gm-product-link"].join(" ")}>
  <figure class="gm-product-link__inner">
    <img
      class="gm-product-link__image"
      src={`/a11y-practice-ground/images/${product.img_name}`}
      alt={product.img_alt}
    />
    <figcaption class="gm-product-link__caption">
      <span class="gm-product-link__name">{product.name}</span>
      <span class="gm-product-link__price">
        {formatPrice(product.price)}
      </span>
    </figcaption>
  </figure>
</a>

<style>
  .gm-product-link {
    display: block;
    border-radius: 10px;
  }

  .gm-product-link:focus {
    box-shadow: rgba(3, 102, 214, 0.3) 0px 0px 0px 3px;
    margin: -3px;
  }

  .gm-product-link__inner {
    position: relative;
  }

  .gm-product-link__image {
    border-radius: 10px;
    height: auto;
  }

  .gm-product-link__caption {
    display: inline-flex;
    background-color: #fff;
    position: absolute;
    right: 10px;
    bottom: 10px;
    padding: 2px 10px;
    border-radius: 10px;
    gap: 0.5rem;
  }
</style>
