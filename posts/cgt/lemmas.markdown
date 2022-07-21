---
title: CGT Appendix ✱
kochtitle: Appendix ✱ - Miscellaneous Definitons and Lemmas
goto: /cgt.html
katex: on
extracss: cgt
index: 100
---

## What?

This page serves only as a repository for definitions and lemmas that, while needed for some important proofs, are not important enough to merit breaking the flow of the narrative.

If you aren't looking at the proofs, you don't need to read this page.

This will be organized by the Part at which the lemma is first used in. This page will *not* explain any notation, so the extremely diligent among you who decided that they might try to familiarize themselves with the lemmas ahead of time are unfortunately out of luck (though I do respect the effort.)

Definitions will lay out in the open. Proofs will be in their usual boxes.

## Introduced for Part 6

**Definition:** $\widetilde{\mathbb{G}}_n$, the set of **positions born by day** $n$, is defined inductively as follows:
$$ \widetilde{\mathbb{G}}_0 = {0} $$
$$ \widetilde{\mathbb{G}}_{n+1} = {\game{L}{R} | L, R \in \widetilde{\mathbb{G}}}_n} $$

**Definition:** $\mathbb{G}_n$, the set of **values born by day** $n$ is the set of all values of positions in $\widetilde{\mathbb{G}}_n$.

**Definition:** The **birthday** of a position $G$, notated $\operatorname{b}(G)$, is the least $n$ such that $G \in \mathbb{G}_n$. A useful characterization of this definition is that $\operatorname{b}(G)$ is the maximal height of any branch of the game tree of $G$.

**Definition:** A **short** position $G$ is a position whose birthday is a natural number. This corresponds to positions which both have finitely-deep and finitely-wide game trees.

<details>
<summary>

**The Archimedian Principle for Integers:** For any short position $G$, there exists some natural number $x$ such that $x > G > -x$
</summary>

-----------

**Proof:**

Choose $x > \operatorname{b}(G)$. In either $x - G$ or $x + G$, Ruby can make at most $x-1$ moves. Lazuli can thus win by making all their moves in $x$.

$\blacksquare$
</details>

<br>
