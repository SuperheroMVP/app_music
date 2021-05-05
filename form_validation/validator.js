//Doi tuong `Validator`
function Validator(options)
{
    var selectorRules = {};
    //Ham thuc hien validate
    function validator(inputElement , rule)
    {
        //value:inputElement.value
        //test function: rule.test;
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector); 
        var errorMessage = rule.test(inputElement.value);
        if(errorMessage)
        {
            errorElement.innerText = errorMessage;
            inputElement.parentElement.classList.add('invalid');
        }
        else
        {
            errorElement.innerText = '';
            inputElement.parentElement.classList.remove('invalid');
        }
    }
    
    //Lay element cua form can validate
    var elementForm = document.querySelector(options.form);
    //console.log(option.rules)

    if(elementForm)
    {
        options.rules.forEach(function (rule)
        {
            //Luu lai cac rule cho moi input
            if(Array.isArray(selectorRules[rule.selector]))
            {
                selectorRules[rule.selector].push(rule.test);
            }
            else
            {
                //lan dau tien se chay vao day
                selectorRules[rule.selector] = [rule.test]
            }

            var inputElement = document.querySelector(rule.selector);
            
            if(inputElement)
            {
                //Xu li truong hop blur ra ngoai input
                inputElement.onblur = function()
                {
                    // console.log('blur'+ rule.selector)
                    validator(inputElement,rule)
                }

                //Xu li truong hop dang nhap vao input
                inputElement.oninput = function()
                {
                    var errorElement = inputElement.parentElement.querySelector(options.errorSelector); 
                    errorElement.innerText = '';
                    inputElement.parentElement.classList.remove('invalid');     
                }

            }
            
        });
        console.log(selectorRules)
    }
}

//Dinh nghia rules
//Nguyen tac cua cac rule.
//1.Khi co loi tra ra message loi
//2.Khi hop le thi khong tra ve cai gi ca(undefine)
Validator.isRequired = function (selector,message){
    return {
        selector:selector,
        test:function(value){
            return value.trim() ? undefined : message || 'Vui long nhap truong nay';
        }
    }
}
Validator.isEmail = function (selector,message){
    return {
        selector:selector,
        test:function(value){
            var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            return regex.test(value) ? undefined : message || 'Truong nay phai la email';
        }
    }
}
Validator.minLength = function (selector,min,message){
    return {
        selector:selector,
        test:function(value){
            return value.length >= min ? undefined : message || `Vui long nhap tren ${min} ky tu`;
        }
    }
}
Validator.isConfirmed = function(selector , getConfirmValue , message)
{
    return {
        selector:selector,
        test:function(value)
        {
            return value === getConfirmValue() ? undefined : message || 'Nhap mat khau khong dung';
        }
    }
}