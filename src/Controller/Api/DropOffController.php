<?php

namespace MyPa\Shopware\Controller\Api;

use Shopware\Core\Framework\Routing\Annotation\RouteScope;
use Shopware\Core\Framework\Validation\DataBag\DataBag;
use Shopware\Core\Framework\Validation\DataBag\RequestDataBag;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use MyPa\Shopware\Facade\MyParcelFacade;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @RouteScope(scopes={"api"})
 */
class DropOffController extends AbstractController
{
    private MyParcelFacade $myParcelFacade;

    public function __construct(MyParcelFacade $myParcelFacade)
    {
        $this->myParcelFacade = $myParcelFacade;
    }

    /**
     * @Route("/api/_action/myparcel/profile/get-drop-off",
     *     defaults={"auth_enabled"=true},
     *     name="api.action.myparcel.drop_off_location",
     *     methods={"POST"}
     *     )
     * @param RequestDataBag $dataBag
     * @return JsonResponse
     */
    public function getDropOff(RequestDataBag $dataBag): JsonResponse
    {
        return $this->myParcelFacade->getDropOffLocation($dataBag->getAlnum('apiKey'));
    }
}
