export const Index = () => {
    return (
        <>
            <div id="zero-state" className='w-full h-full flex justify-center items-center flex-col text-white text-xl min-w-max'>
                <span className='text-5xl mb-2'>TODO</span>
                <div className='text-center mt-3'>
                    Check out
                    <br/>
                    the repository at{" "}
                    <a className='
                        underline
                        decoration-wavy
                        hover:bg-accent_color
                        rounded-md
                        visited:decoration-accent_color
                        '
                       href="https://github.com/kwonsigyeong"
                       target='_blank'

                    >
                         kwonsigyeong/todo-app
                    </a>
                    .
                </div>

            </div>
        </>
    )
}