<script lang="ts">
  import { Product } from "@/utility/dummy"
  import { formatPrice } from "./utility/format-text"

  export let product: Product
</script>

<div class="flip --y">
  <figure class="flip__origin">
    <img
      class="flip__front flip__image"
      src={`/images/${product.img_name}`}
      alt={product.img_alt}
    />
    <figcaption class="flip__back flip__content">
      <div>{product.name}</div>
      <div>{formatPrice(product.price)}</div>
    </figcaption>
  </figure>
</div>

<style>
  .flip {
    display: block;
    border-radius: 10px;
    width: fit-content;
  }

  .flip__image {
    border-radius: 10px;
    object-fit: cover;
    aspect-ratio: 1 / 1;
  }

  .flip__content {
    background-color: #666;
    color: #fff;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .flip__origin {
    position: relative;
  }

  .flip__front {
    transition-property: transform, opacity;
    transition-duration: 0.35s;
    transition-timing-function: ease;
    backface-visibility: hidden;
  }

  .flip__back {
    position: absolute;
    inset: 0;
    transition-property: transform, opacity;
    transition-duration: 0.35s;
    transition-timing-function: ease;
    opacity: 0;
  }

  .flip:hover .flip__front {
    opacity: 0;
  }

  .flip:hover .flip__back {
    opacity: 1;
    transition-delay: 0.15s;
  }

  :global(.flip.--x) .flip__back {
    transform: rotateX(90deg);
    transform-origin: 0% 50%;
  }

  :global(.flip.--x):hover .flip__front {
    transform: rotateX(-180deg);
  }

  :global(.flip.--x):hover .flip__back {
    transform: rotateX(0);
  }

  :global(.flip.--y) .flip__back {
    transform: rotateY(90deg);
    transform-origin: 50% 0%;
  }

  :global(.flip.--y):hover .flip__front {
    transform: rotateY(-180deg);
  }

  :global(.flip.--y):hover .flip__back {
    transform: rotateY(0);
  }

  :global(.flip.--zr) .flip__back {
    transform: rotate3d(1, -1, 0, 100deg);
  }

  :global(.flip.--zr):hover .flip__front {
    transform: rotate3d(-1, 1, 0, 100deg);
  }

  :global(.flip.--zr):hover .flip__back {
    transform: rotate3d(0, 0, 0, 0deg);
  }

  :global(.flip.--zl) .flip__back {
    transform: rotate3d(1, 1, 0, 100deg);
  }

  :global(.flip.--zl):hover .flip__front {
    transform: rotate3d(-1, -1, 0, 100deg);
  }

  :global(.flip.--zl):hover .flip__back {
    transform: rotate3d(0, 0, 0, 0deg);
  }
</style>
