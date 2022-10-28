<?php

namespace MyPa\Shopware\Service\Shopware;

use Shopware\Core\Checkout\Cart\Cart;
use Shopware\Core\Checkout\Cart\SalesChannel\CartService as ShopwareCartService;
use Shopware\Core\Framework\Struct\ArrayStruct;
use Shopware\Core\System\SalesChannel\SalesChannelContext;

class CartService
{
    const NAME = 'myparcel-data';
    protected $cartService;

    public function __construct(ShopwareCartService $cartService)
    {
        $this->cartService = $cartService;
    }

    public function recalculate(SalesChannelContext $context): Cart
    {
        $cart = $this->cartService->getCart($context->getToken(), $context);
        return $this->cartService->recalculate($cart, $context);
    }

    public function hasData(SalesChannelContext $context, ?string $key = null): bool
    {
        $cart = $this->cartService->getCart($context->getToken(), $context);

        $hasData = $cart->hasExtensionOfType(self::NAME, ArrayStruct::class);

        if(empty($key)) {
            return $hasData;
        }

        if(!$hasData) {
            return false;
        }

        /** @var ArrayStruct $data */
        $data = $cart->getExtensionOfType(self::NAME, ArrayStruct::class);

        return $data->has($key);
    }

    public function addData(array $data, SalesChannelContext $context): Cart
    {
        $cart = $this->cartService->getCart($context->getToken(), $context);

        if(!$cart->hasExtensionOfType(self::NAME, ArrayStruct::class)) {
            $cart->addExtension(self::NAME, new ArrayStruct());
        }

        /** @var ArrayStruct $postnlData */
        $postnlData = $cart->getExtensionOfType(self::NAME, ArrayStruct::class);

        foreach($data as $key => $value) {
            $postnlData->set($key, $value);
        }

        // Will save the cart to the database
        return $this->cartService->recalculate($cart, $context);
    }

    public function getData(SalesChannelContext $context): array
    {
        $cart = $this->cartService->getCart($context->getToken(), $context);

        if(!$cart->hasExtensionOfType(self::NAME, ArrayStruct::class)) {
            return [];
        }

        /** @var ArrayStruct $postnlData */
        $postnlData = $cart->getExtensionOfType(self::NAME, ArrayStruct::class);

        return $postnlData->all();
    }

    public function getByKey(string $key, SalesChannelContext $context)
    {
        $data = $this->getData($context);

        if(!array_key_exists($key, $data)) {
            return null;
        }

        return $data[$key];
    }
}