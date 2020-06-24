document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const $customerDemoIframe = document.getElementById('customer-demo')
    const $waiterDemoIframe = document.getElementById('waiter-demo')

    const $customerDemo = getIframeDocument($customerDemoIframe)
    const $waiterDemo = getIframeDocument($waiterDemoIframe)

    const $customerModalBtnSummon = $customerDemo.querySelector(
      '[data-cy="open-summon-waiter-modal"]',
    )
    $customerModalBtnSummon.onclick = () => {
      setTimeout(() => {
        const btns = [
          '[data-cy="summon-waiter-pay-cash"]',
          '[data-cy="summon-waiter-pay-card"]',
          '[data-cy="summon-waiter-other"]',
        ].map(s => $customerDemo.querySelector(s))

        btns.forEach(btn => {
          btn.onclick = () =>
            setTimeout(() => refreshWaiterIframe($waiterDemoIframe), 300)
        })
      }, 300)
    }

    const $customerModalBtnOrder = $customerDemo.querySelector(
      '[data-cy="open-order-modal"]',
    )
    $customerModalBtnOrder.onclick = () => {
      setTimeout(() => {
        const btn = $customerDemo.querySelector(
          '[data-cy="confirm-dish-order"]',
        )
        btn.onclick = () =>
          setTimeout(() => refreshWaiterIframe($waiterDemoIframe), 300)
      }, 300)
    }
  }, 5000)
})

const refreshWaiterIframe = iframe => {
  iframe.contentDocument.location.reload()
}

const getIframeDocument = node =>
  node.contentDocument || node.contentWindow.document
