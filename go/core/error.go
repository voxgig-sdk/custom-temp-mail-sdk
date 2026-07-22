package core

type CustomTempMailError struct {
	IsCustomTempMailError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewCustomTempMailError(code string, msg string, ctx *Context) *CustomTempMailError {
	return &CustomTempMailError{
		IsCustomTempMailError: true,
		Sdk:              "CustomTempMail",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *CustomTempMailError) Error() string {
	return e.Msg
}
