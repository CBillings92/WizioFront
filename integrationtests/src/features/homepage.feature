Feature:
    Want to make sure our homepage loads correctly

Scenario: Check title of website
    Given I open the url "/"
    Then I expect that the title is "Wizio"

Scenario: Test to see if VR button is there
    Given the element ".home-sign-up__button" is visible
    When  I click on the button ".home-sign-up__button"
    Then  I expect the url to contain "pricing"
