<?php

namespace AppBundle\DataFixtures\ORM;

use AppBundle\Entity\Article;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

class Fixtures extends Fixture
{

    /**
     * Load data fixtures with the passed EntityManager
     *
     * @param ObjectManager $manager
     */
    public function load(ObjectManager $manager)
    {
        for ($i = 0; $i < 10; $i++) {
            $article = new Article();
            $article->setTitle("Mon {$i} titre");
            $article->setContent('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam architecto beatae cumque dolores, eaque ex labore, laboriosam, magnam molestias nulla odio perspiciatis placeat provident qui suscipit tempora tempore totam veniam.');
            $article->setCreatedAt(new \DateTime('now'));
            $article->setUpdatedAt(new \DateTime('now'));

            $manager->persist($article);
        }

        $manager->flush();
    }
}