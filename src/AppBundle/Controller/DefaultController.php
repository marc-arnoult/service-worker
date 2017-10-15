<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class DefaultController extends Controller
{
    /**
     * @Route("/", name="homepage")
     */
    public function indexAction(Request $request)
    {
        $manager = $this->getDoctrine()->getRepository('AppBundle:Article');
        $articles = $manager->findAll();
        // replace this example code with whatever you need
        return $this->render('default/index.html.twig', ['articles' => $articles]);
    }

    /**
     * @return JsonResponse
     * @Route("/api/count", name="count_page")
     */
    public function countAction()
    {
        return $this->json(['nbArticles' => 30]);
    }
}
